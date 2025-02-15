import { TroutePath } from "../types";

export const routeGenerator = (items: TroutePath[]) => {
  return items.reduce((acc: TroutePath[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
        children: (item.children || []).map(({ name, path, ...rest }) => ({
          ...rest,
          ...(name === "Home" ? { index: true } : { path }), 
        })),
      });
    }
    return acc;
  }, []);
};
