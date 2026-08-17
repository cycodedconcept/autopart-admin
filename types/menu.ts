interface NavChildItem {
  icon: React.ReactNode;
  label: string;
  hasChildren: boolean;
  child: null;
  link?: string;
}
export interface NavItem {
  icon: React.ReactNode;
  label: string;
  link?: string;
  hasChildren?: boolean;
  child?: NavChildItem[];
}

export type MenuItem =
  | "dashboard"
  | "analytics"
  | "settings"
  | "tracking"
  | "customer"
  | "clients"
  | "companies"
  | "attendance"
  | "message"
  | "settings";

export interface MenuContextItem {
  active: string;
  color: string;
  showSidebar: boolean;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
