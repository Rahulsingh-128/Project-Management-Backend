import { getToken } from "../model/authCrud";

export const isAuthenticated = () => {
  const token = getToken();
  return token !== null;
};