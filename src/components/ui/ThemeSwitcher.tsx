import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, ChevronDown, Check } from 'lucide-react';
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
    { mode: 'dark', label: 'Dark Mode', icon: Moon },
    { mode: 'light', label: 'Light Mode', icon: Sun },
    { mode: 'system', label: 'System Mode', icon: Laptop }
  ];

  const CurrentIcon = theme === 'system' ? Laptop : (resolvedTheme === 'dark' ? Moon : Sun);

  if (compact) {
    return (
      <div className="flex items-center bg-slate-900 light:bg-slate-200 p-1 rounded-xl border border-slate-700 light:border-slate-300 shadow-inner">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              onClick={() => setTheme(opt.mode)}
              title={opt.label}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-950'
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
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 light:bg-white border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 text-xs font-bold hover:border-amber-400/60 transition-all shadow-sm cursor-pointer"
        aria-label="Select Theme Mode"
      >
        <CurrentIcon className="w-4 h-4 text-amber-400" />
        <span className="capitalize hidden sm:inline">{theme === 'system' ? 'System' : (theme === 'dark' ? 'Dark' : 'Light')}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-2xl bg-slate-950 light:bg-white border border-slate-700 light:border-slate-200 shadow-2xl z-50 p-1.5 space-y-1 gold-border-pulse">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400 light:text-slate-500 px-2 py-1">
            Display Mode:
          </div>
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 light:text-slate-700 hover:bg-slate-900 light:hover:bg-slate-100 hover:text-amber-400 light:hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-slate-950" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
