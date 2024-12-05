const API_URL = process.env.API_URL;
console.log(API_URL);
export const Routes = {
  user: {
    delete: "/api/admin/delete",
  },
  auth: {
    verify: "/api/auth",
  },
  content: {
    upload: "/api/upload",
  },
  mail: {
    send: "/api/sendmail",
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
