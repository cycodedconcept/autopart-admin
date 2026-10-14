import { CSSProperties, RefObject, useLayoutEffect, useState } from "react";

// Positions a dropdown with `position: fixed` next to its trigger so it is not
// clipped by scrollable parents (e.g. `overflow-x-auto` table wrappers).
// Opens upward when there is not enough room below, and closes on scroll/resize.
export function useFloatingMenu(
  triggerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
  menuHeight = 120,
) {
  const [style, setStyle] = useState<CSSProperties>({ visibility: "hidden" });

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const openUp = window.innerHeight - rect.bottom < menuHeight + 8;
    setStyle({
      position: "fixed",
      right: window.innerWidth - rect.right,
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    });

    window.addEventListener("scroll", onClose, true);
    window.addEventListener("resize", onClose);
    return () => {
      window.removeEventListener("scroll", onClose, true);
      window.removeEventListener("resize", onClose);
    };
  }, [isOpen, triggerRef, onClose, menuHeight]);

  return style;
}
