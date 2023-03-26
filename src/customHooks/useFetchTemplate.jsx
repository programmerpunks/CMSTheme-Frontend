import { useState, useEffect, useContext } from 'react'

import AuthContext from '../context/auth';
import { getTemplate } from '../helpers/users';

export const useFetchTemplate = ({ setFetching }) => {
  let { check } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [template, setTemplate] = useState([])


  useEffect(() => {
    setLoading(true)
    setFetching(true)
    getTemplate({ setTemplate, setFetching })
  }, [check]);

  return [template, loading];
}