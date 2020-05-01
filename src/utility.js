export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

export const isLoggedInAsAdmin = () => {
  const token = localStorage.getItem("admin");
  return token ? true : false;
};
