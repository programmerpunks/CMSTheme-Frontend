import axios from 'axios';
import { BASE_URL, DELETEUSERS, FETCHUSERS, LOGINUSER, REGISTER } from './urls';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: BASE_URL });
API.interceptors.request.use(req => {
  if (Cookies.get('token')) {
    req.headers.authorization = `Bearer ${Cookies.get('token')}`;
  }

  return req;
});

export const register = userdata => API.post(REGISTER, userdata);
export const fetchusers = () => API.get(FETCHUSERS);
export const deleteuser = (uid) => API.get(DELETEUSERS(uid));
export const loginuser = () => API.post(LOGINUSER);


