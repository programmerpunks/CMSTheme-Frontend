import { useState, useEffect, useContext } from 'react'

import AuthContext from '../context/auth';
import { get_template } from '../helpers/users';

export const useFetchTemplate = ({ setFetching }) => {
  let { check } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [template, setTemplate] = useState([])


  useEffect(() => {
    setLoading(true)
    setFetching(true)
    get_template({ setTemplate, setFetching })
  }, [check]);

  return [template, loading];
}