import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { SelectField, TextField } from '../components/Fields'
import Logo from '../components/Logo'
import { Airtable } from '../api/Airtable'

function Register () {

  const base = new Airtable()

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [source, setSource] = useState('')

  // check if user is saved in sessionStorage, redirect to dashboard if so
  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user) {
      window.location.href = '/dashboard'
    }
  }, [])

  const createAccount = () => {

    base.createUser(first, last, email, password, source)
      .then(response => {
        sessionStorage.setItem('user', JSON.stringify(response))
        window.location.href = '/new'
      })
  }

  return (
          <TextField
            className="col-span-full"
            label="How did you hear about us?"
            id="source"
            name="source"
            type="text"
            autoComplete="source"
            required
            value={source}
            onChange={e => setSource(e.target.value)}
          />
  )
}

export default Register;