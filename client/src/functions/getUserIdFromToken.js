import jwtDecode from "jwt-decode";

export function getUserId () {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  return decodedToken.id;
}