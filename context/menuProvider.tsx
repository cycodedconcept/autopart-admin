import { useState } from "react";
import { MenuContext } from "./menuContext";
import { usePathname } from "next/navigation";
import { navigationSections } from "@/components/layout/sidebar";

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getPath = usePathname();
  
  let recent;

for (const section of navigationSections) {
  const match = section.items.find(item => item.link === getPath);
  if (match) {
    recent = match;
    break; // Stops searching immediately once found
  }
}

  const [color, setColor] = useState("#575757");
  const [active, setActive] = useState(recent?.subTitle || "");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <MenuContext.Provider
      value={{
        active,
        setActive,
        color,
        setColor,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
