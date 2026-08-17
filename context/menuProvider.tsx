import { useState } from "react";
import { MenuContext } from "./menuContext";
import { usePathname } from "next/navigation";

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getPath = usePathname();
  const splitPath = getPath.split("/");
  const current = splitPath[splitPath.length - 1];
  let recent;
  if (current.includes("-")) {
    let path = current.replace("-", " ");
    let first = path[0].toUpperCase();
    let second = path.slice(1);
    recent = first + second;
  } else {
    recent = current;
  }

  const [color, setColor] = useState("#575757");
  const [active, setActive] = useState(recent);
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
