import React from 'react';
import { Search } from 'lucide-react'; // Optional: Added a search icon for a premium UI look

interface SearchInputProps {
  value: string;
  leftSide?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  padd?: string;
  className?: string; // Allows overriding width or spacing from outside
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  leftSide = false,
  padd ="pl-3 pr-3 py-2",
  placeholder = "Search sellers...",
  className = "w-full md:w-72"
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Optional: Visual structural icon anchor */}
      {leftSide && <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-dark/40">
        <Search size={14} />
      </div>
      }
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full text-xs border border-lightborder rounded-lg focus:outline-none focus:border-orange-400 transition-colors placeholder-dark/50 bg-white text-dark ${padd}`}
      />
    </div>
  );
};
