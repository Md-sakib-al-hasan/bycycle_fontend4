import { NavLink } from "react-router-dom";
import { TroutePath } from "../types";
import { ReactNode } from "react";

export const NavlistGenerator = (items: TroutePath[]) => {

  

  const routes = items[0].children?.reduce((acc: ReactNode[], item) => {
    if (item.name && item.path) {
      acc.push(
        <NavLink to={item.name==="Home"?'/':item.path} >{item.name}</NavLink>
      );
    }
    return acc;
  }, []);

  return routes;
};