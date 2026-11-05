import React from 'react';

// --- Card container layout wrapper ---
interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  alertTitle?: boolean;
}

export const SettingsCard: React.FC<CardProps> = ({ title, description, children, alertTitle }) => {
  return (
    <div className="bg-white border border-lightborder rounded-lg p-4 flex flex-col">
      <div className={description ? 'mb-5' : 'mb-4'}>
        <h2 className={`text-base font-medium ${alertTitle ? 'text-[#EF4444]' : 'text-dark'}`}>
          {title}
        </h2>
        {description && <p className="text-xs text-navgray mt-1">{description}</p>}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};

// --- Nested internal sub-navigation menu links ---
interface NavItem {
  id: string;
  label: string;
 icon: React.ComponentType<{ size: number; color: string }>;
}

interface SubNavProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const SettingsSubNav: React.FC<SubNavProps> = ({ items, activeId, onSelect }) => {
  return (
    <div className="md:w-20 lg:w-44 xl:w-64 bg-white border border-lightborder rounded-lg p-3 flex flex-col gap-1 h-fit shrink-0">
      {items.map((item) => {
        const IconComponent = item.icon;
        const isActive = item.id === activeId;
        const col = isActive ? "#FF7101" : "#525866";
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left transition-all font-medium cursor-pointer ${
              isActive
                ? 'bg-[#FFF4EE] text-aorange font-semibold'
                : 'hover:bg-slate-50 text-navgray'
            }`}
          >
            <span
                        className={isActive ? "text-aorange" : "text-navgray"}
                      >
                        <IconComponent size={16} color={col} />
                      </span>
           <span className={`md:hidden lg:block`}>
             {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
