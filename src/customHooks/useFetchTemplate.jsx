import { useState, useEffect, useContext } from 'react'
import { get_template } from '../helpers/users';
import AuthContext from '../context/auth';

export const useFetchTemplate = ({ fetching, setFetching }) => {
  let { check } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [template, setTemplate] = useState([])


  useEffect(() => {
    setLoading(true)
    get_template({ setTemplate, fetching, setFetching })
  }, [check]);

  return [template, loading];
}