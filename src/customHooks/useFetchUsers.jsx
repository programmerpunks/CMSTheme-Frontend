import { useState, useEffect } from "react";

import { get_users } from "../helpers/admin";

export const useFetchUsers = ({ fetch }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    get_users({ setUsers });
  }, [fetch]);
  return users;
};
