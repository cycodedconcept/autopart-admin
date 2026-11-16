import { MenuContextItem } from "@/types/menu";
import React, { useContext } from "react";

export const MenuContext = React.createContext<MenuContextItem | undefined>(
  undefined
);

export const useMenu = () => {
    const context = useContext(MenuContext)

    if(!context){
        throw new Error("Context undefined")
    }
    return context
}