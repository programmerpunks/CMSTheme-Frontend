import { useState, useEffect } from 'react'
import { get_users } from '../helpers/admin';

export const useFetchUsers = ({ fetch }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    get_users({ setUsers, setLoading })

  }, [fetch]);
  return [users, loading];
}