import { useState, useEffect } from "react";

import { getUsers } from "../helpers/admin";

export const useFetchUsers = ({ fetch }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers({ setUsers });
  }, [fetch]);
  return users;
};
