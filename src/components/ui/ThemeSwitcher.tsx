import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, ChevronDown } from 'lucide-react';
import { useTheme, type ThemeMode } from '../../context/ThemeContext';

export const ThemeSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { mode: 'light', label: 'Light Mode', icon: Sun },
    { mode: 'dark', label: 'Dark Mode', icon: Moon },
    { mode: 'system', label: 'System Base', icon: Laptop }
  ];

  const currentIcon = resolvedTheme === 'dark' 
    ? (theme === 'system' ? Laptop : Moon) 
    : (theme === 'system' ? Laptop : Sun);

  const CurrentIconComponent = currentIcon;

  if (compact) {
    return (
      <div className="flex items-center bg-slate-900/80 dark:bg-slate-900 light:bg-slate-100 p-1 rounded-xl border border-slate-700/60 dark:border-slate-800 light:border-slate-300">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              onClick={() => setTheme(opt.mode)}
              title={opt.label}
              className={`p-1.5 rounded-lg transition-all ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 dark:bg-slate-900 light:bg-slate-100 border border-slate-700/80 dark:border-slate-800 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-800 text-xs font-semibold hover:border-amber-400/60 transition-colors shadow-sm"
        aria-label="Select Theme Mode"
      >
        <CurrentIconComponent className="w-3.5 h-3.5 text-amber-400" />
        <span className="capitalize hidden sm:inline">{theme}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl z-50 p-1.5 space-y-1">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setTheme(opt.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 hover:text-white dark:hover:text-white light:hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
