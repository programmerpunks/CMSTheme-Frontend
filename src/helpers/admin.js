import "antd/dist/antd.css";
import { message } from "antd";

import { fetchusers, register, deleteuser } from "../api/index";

export const registerUser = async ({ formData, setError }) => {
  try {
    let response = await register({ formData });
    if (response.status === 201) {
      setError("");
      message.success("User Created");
    }
  } catch (err) {
    setError(err.response.data.error);
    message.error(err.response.data.error);
  }
};

export const getUsers = async ({ setUsers }) => {
  try {
    let response = await fetchusers();
    if (response.status === 202) {
      setUsers(response.data.users);
    }
  } catch (err) {
    message.error(err.response.data.error);
  }
};

export const deleteUser = async ({ uid, setFetch, fetch, setOpen }) => {
  try {
    let response = await deleteuser(uid);
    if (response.status === 202) {
      setFetch(!fetch);
      setOpen(false);
      message.success("User Deleted");
    }
  } catch (err) {
    message.error(err.response.data.error);
  }
};
