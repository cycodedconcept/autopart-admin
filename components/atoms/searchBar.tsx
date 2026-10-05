import { useState, useRef, useEffect, useCallback, useId, ChangeEvent, KeyboardEvent } from "react";
import { Search, X, SlidersHorizontal, Loader2 } from "lucide-react";
import { SearchBarProps, SearchBarSize, SearchSuggestion, SizeStyle } from "@/types/searchBar";


export function SearchBar({
  value: controlledValue,
  onChange,
  onSearch,
  onSubmit,
  debounceMs = 300,
  placeholder = "Search...",
  size = "md",
  loading = false,
  suggestions = null,
  onSuggestionSelect,
  trailing,
  className = "",
  iconClass="placeholder:text-dark-gray"
}: SearchBarProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>("");
  const value = isControlled ? (controlledValue as string): internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
   const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();

  const sizeStyles = {
    sm: { bar: "h-9 text-sm", icon: 16, px: "px-3" },
    md: { bar: "h-11 text-sm", icon: 18, px: "px-4" },
    lg: { bar: "h-13 text-base", icon: 20, px: "px-5" },
  }[size] ?? { bar: "h-11 text-sm", icon: 18, px: "px-4" };

  // Debounced search callback
  useEffect(() => {
    if (!onSearch) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
    if (debounceRef.current) {
 return clearTimeout(debounceRef.current);
}
    
  }, [value, debounceMs, onSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  }

  function handleClear() {
    setValue("");
    onSearch?.("");
    setIsOpen(false);
  }

  function selectSuggestion(s: SearchSuggestion) {
    setValue(s.label);
    onSuggestionSelect?.(s);
    setIsOpen(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const list = suggestions ?? [];
    if (e.key === "Enter") {
      if (isOpen && activeIndex >= 0 && list[activeIndex]) {
        selectSuggestion(list[activeIndex]);
      } else {
        onSubmit?.(value);
        setIsOpen(false);
      }
    } else if (e.key === "ArrowDown" && list.length) {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((i) => (i + 1) % list.length);
    } else if (e.key === "ArrowUp" && list.length) {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((i) => (i <= 0 ? list.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  const showDropdown = isOpen && suggestions && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <div
        className={[
          "flex items-center gap-2 bg-white border border-agray-border rounded-3xl",
          "focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-400",
          "transition-colors",
          sizeStyles.bar,
          sizeStyles.px,
        ].join(" ")}
      >
        {loading ? (
          <Loader2
            size={sizeStyles.icon}
            className="animate-spin text-dark-gray shrink-0"
          />
        ) : (
          <Search size={sizeStyles.icon} className={`${iconClass} shrink-0`} />
        )}

        <input
          type="text"
          role="combobox"
        //   aria-expanded={showDropdown}
          aria-controls={listId}
          aria-autocomplete="list"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions && setIsOpen(true)}
          placeholder={placeholder}
          className={`flex-1 min-w-0 bg-transparent outline-none text-dark-gray ${iconClass}`}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="shrink-0 text-gray-500 hover:text-gray-500 transition-colors"
          >
            <X size={sizeStyles.icon} />
          </button>
        )}

        {trailing && <div className="shrink-0 flex items-center">{trailing}</div>}
      </div>

      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden py-1"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                selectSuggestion(s);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              className={[
                "px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between",
                i === activeIndex ? "bg-orange-50 text-orange-600" : "text-gray-700",
              ].join(" ")}
            >
              <span>{s.label}</span>
              {s.meta && <span className="text-xs text-gray-400">{s.meta}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


