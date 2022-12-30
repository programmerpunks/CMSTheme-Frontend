import { useState, useEffect } from 'react'
import { get_users } from '../helpers/admin';

export const useFetchUsers = ({ check }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    get_users({ setUsers, setLoading })
  }, [check]);
  return [users, loading];
}