export interface SearchSuggestion {
  id: string;
  label: string;
  meta?: string;
}

export type SearchBarSize = "sm" | "md" | "lg";
export interface SizeStyle {
  bar: string;
  icon: number;
  px: string;
}

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onSubmit?: (query: string) => void;
  debounceMs?: number;
  placeholder?: string;
  size?: SearchBarSize;
  loading?: boolean;
  suggestions?: SearchSuggestion[] | null;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  trailing?: React.ReactNode;
  className?: string;
  iconClass?: string;
}