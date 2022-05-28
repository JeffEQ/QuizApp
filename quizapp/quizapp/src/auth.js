const getToken = () => {
  const tokenString = localStorage.getItem("user");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

const setToken = (user, data) => {
  localStorage.setItem(user, JSON.stringify(data));
};

const removeToken = () => {
  localStorage.removeItem("user");
};

export { getToken, setToken, removeToken };
