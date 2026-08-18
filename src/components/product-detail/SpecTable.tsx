import React from 'react';
import type { ProductSpec } from '../../types';

interface SpecTableProps {
  specs: ProductSpec;
}

export const SpecTable: React.FC<SpecTableProps> = ({ specs }) => {
  const specRows = [
    { label: 'Rated Load Capacity', imperial: `${specs.ratedCapacityLbs.toLocaleString()} lbs`, metric: `${specs.ratedCapacityKg.toLocaleString()} kg` },
    { label: 'Max Lifting / Platform Height', imperial: `${specs.maxLiftHeightInches} in (${(specs.maxLiftHeightInches / 12).toFixed(1)} ft)`, metric: `${specs.maxLiftHeightMm} mm` },
    { label: 'Lowered / Stowed Height', imperial: `${specs.loweredHeightInches} in`, metric: `${Math.round(specs.loweredHeightInches * 25.4)} mm` },
    specs.forkLengthInches ? { label: 'Fork Dimensions (L x W)', imperial: `${specs.forkLengthInches}" L x ${specs.forkWidthInches || 27}" W`, metric: `${Math.round(specs.forkLengthInches * 25.4)} x ${Math.round((specs.forkWidthInches || 27) * 25.4)} mm` } : null,
    specs.platformLengthInches ? { label: 'Platform Deck Size', imperial: `${specs.platformLengthInches}" L x ${specs.platformWidthInches}" W`, metric: `${Math.round(specs.platformLengthInches * 25.4)} x ${Math.round((specs.platformWidthInches || 29) * 25.4)} mm` } : null,
    { label: 'Minimum Turning Radius', imperial: `${specs.turningRadiusInches} in`, metric: `${Math.round(specs.turningRadiusInches * 25.4)} mm` },
    { label: 'Power Source & Voltage', imperial: specs.powerSource, metric: specs.batterySpecs || specs.powerSource },
    specs.driveMotorKw ? { label: 'Drive Motor Rating', imperial: `${specs.driveMotorKw} kW Brushless AC`, metric: `${specs.driveMotorKw} kW` } : null,
    specs.liftMotorKw ? { label: 'Lift Hydraulic Motor', imperial: `${specs.liftMotorKw} kW Pump`, metric: `${specs.liftMotorKw} kW` } : null,
    { label: 'Total Service Weight', imperial: `${specs.operatingWeightLbs.toLocaleString()} lbs`, metric: `${Math.round(specs.operatingWeightLbs * 0.453592).toLocaleString()} kg` },
    specs.travelSpeedMph ? { label: 'Travel Speed (Laden / Unladen)', imperial: `${specs.travelSpeedMph.laden} / ${specs.travelSpeedMph.unladen} mph`, metric: `${(specs.travelSpeedMph.laden * 1.609).toFixed(1)} / ${(specs.travelSpeedMph.unladen * 1.609).toFixed(1)} km/h` } : null,
    { label: 'Wheel / Tire Composition', imperial: specs.wheelType, metric: 'Industrial Non-Marking' },
    { label: 'Powertrain Warranty', imperial: `${specs.warrantyMonths} Months Nationwide`, metric: `${Math.round(specs.warrantyMonths / 12)} Years Full OEM` },
  ].filter(Boolean);

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
          <tr>
            <th className="py-3 px-4">Engineering Parameter</th>
            <th className="py-3 px-4 text-amber-400">Imperial (US)</th>
            <th className="py-3 px-4 text-slate-300">Metric (ISO/SI)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-300 font-medium">
          {specRows.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
              <td className="py-2.5 px-4 font-semibold text-white">{row?.label}</td>
              <td className="py-2.5 px-4 text-amber-300 font-mono font-bold">{row?.imperial}</td>
              <td className="py-2.5 px-4 text-slate-400 font-mono">{row?.metric}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
