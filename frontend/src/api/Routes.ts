const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Routes = {
  user: {
    delete: "/admin/api/delete",
  },
  auth: {
    verify: "/api/auth",
  },
};

const addApiPrefix = (routesObj, prefix) => {
  const newRoutes = Routes;

  for (const key in routesObj) {
    if (typeof routesObj[key] === "string") {
      newRoutes[key] = `${prefix}${routesObj[key]}`;
    } else if (typeof routesObj[key] === "object") {
      newRoutes[key] = addApiPrefix(routesObj[key], prefix);
    }
  }
  return newRoutes;
};

export const routes = addApiPrefix(Routes, API_URL);
