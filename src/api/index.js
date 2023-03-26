import axios from "axios";
import {
  BASE_URL,
  CMSDATA,
  DELETEIMAGE,
  DELETEUSERS,
  FETCHUSERS,
  LOGINUSER,
  REGISTER,
  USERTEMPLATE,
} from "./urls";
import Cookies from "js-cookie";

const API = axios.create({ baseURL: BASE_URL });
API.interceptors.request.use((req) => {
  if (Cookies.get("token")) {
    req.headers.authorization = `Bearer ${Cookies.get("token")}`;
  }

  return req;
});

export const register = (userdata) => API.post(REGISTER, userdata);
export const fetchusers = () => API.get(FETCHUSERS);
export const deleteuser = (uid) => API.get(DELETEUSERS(uid));
export const loginuser = (userdata) => API.post(LOGINUSER, userdata);
export const applycms = (userdata) => API.post(CMSDATA, userdata);
export const fetchtemplate = (userdata) => API.post(USERTEMPLATE, userdata);
export const deleteimage = (userdata) => API.post(DELETEIMAGE, userdata);
