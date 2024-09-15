import userLogin from "../models/dataUsers";

function userVerify(username, password) {
  return userLogin.find(user => user.username === username && user.password === password);
}
function userVerifyAdmin(username, password) {
  return userLogin.find(user => user.usernameAdmin === username && user.passwordAdmin === password);
}

export { userVerify, userVerifyAdmin };