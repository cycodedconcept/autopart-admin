import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: string;
  prefixSymbol?: string;
}

export const FormInput: React.FC<InputProps> = ({ label, suffix, prefixSymbol, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-navgray uppercase mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        {prefixSymbol && (
          <span className="absolute left-3 text-navgray text-sm select-none">
            {prefixSymbol}
          </span>
        )}
        <input
          {...props}
          className={`w-full border border-lightborder rounded-lg text-sm px-3 py-2 bg-white text-dark placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 ${
            prefixSymbol ? 'pl-7' : ''
          } ${suffix ? 'pr-8' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 text-navgray text-sm select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

// --- Dropdown/Select option input component ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export const FormSelect: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium  text-navgray uppercase mb-2">
        {label}
      </label>
      <select
        {...props}
        className="w-full px-3 py-2 border border-lightborder rounded-lg text-sm bg-white text-dark focus:outline-none focus:ring-1 focus:ring-slate-400"
      >
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

// --- Stateful toggle switch component ---
interface ToggleProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
  titleColorClass?: string;
}

export const ToggleRow: React.FC<ToggleProps> = ({
  title,
  description,
  enabled,
  onChange,
  titleColorClass = 'text-slate-800',
}) => {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div className="flex-1">
        <h3 className={`text-sm font-medium ${titleColorClass}`}>{title}</h3>
        <p className="text-xs text-navgray mt-0.5 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer ${
          enabled ? 'bg-aorange' : 'bg-slate-200'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
