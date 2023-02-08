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
  const [option, setOption] = useState('')

  // check if user is saved in sessionStorage, redirect to dashboard if so
  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user) {
      window.location.href = '/dashboard'
    }
  }, [])

  const createAccount = () => {

    base.createUser(first, last, email, password, option)
     .then(response => {
        sessionStorage.setItem('user', JSON.stringify(response))
        window.location.href = '/new'
     })
  }

  return (
    <>
      <div className='grid grid-cols-2 min-h-screen'>
        <div className='p-16'>
          <div className="flex flex-col">
            <a href="/" aria-label="Home">
              <Logo className="" />
            </a>
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Get started for free
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Already built a site?{' '}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign in
                </a>
                {' '} to your account.
              </p>
            </div>
          </div>
          <form
            action="#"
            className="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2"
          >
            <TextField
              label="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
              value={first}
              onChange={e => setFirst(e.target.value)}
            />
            <TextField
              label="Last name"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
              value={last}
              onChange={e => setLast(e.target.value)}
            />
            <TextField
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              className="col-span-full"
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <SelectField
              className="col-span-full"
              label="How did you hear about us?"
              id="referral_source"
              name="referral_source"
              value={option}
              onChange={e => setOption(e.target.value)}
            >
              <option>AltaVista search</option>
              <option>Super Bowl commercial</option>
              <option>Our route 34 city bus ad</option>
              <option>The “Never Use This” podcast</option>
            </SelectField>
            <div className="col-span-full">
              <Button
                type="button"
                variant="solid"
                color="slate"
                className="w-full"
                onClick = {createAccount}
              >
                <span>
                  Sign up <span aria-hidden="true">&rarr;</span>
                </span>
              </Button>
            </div>
          </form>
        </div>
        <div className='bg-blue-600'></div>
      </div>
    </>
  )
}

export default Register;