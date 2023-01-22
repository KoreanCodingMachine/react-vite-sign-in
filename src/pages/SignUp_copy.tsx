import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, FormField } from '../components/styled/Form'
import objectSetValue from '../utils/object.setValue'

type SignUpFormValue = {
  email: string
  password: string
  passwordConfirm: string
}

const SignUp = () => {
  const [formValue, _setFormValue] = useState<SignUpFormValue>({
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const setFormValue = <K extends keyof SignUpFormValue>(
    fieldName: K,
    value: SignUpFormValue[K]
  ) => {
    objectSetValue(_setFormValue, fieldName, value)
  }

  return (
    <div>
      <h3>Sign-Up</h3>

      <div className="form-wrapper">
        <Form>
          <FormField>
            <input
              value={formValue.email}
              onChange={e => setFormValue('email', e.target.value)}
              type="email"
              name="user-email"
              autoFocus
              placeholder="email"
              required
            />
          </FormField>
          <FormField>
            <input
              value={formValue.password}
              onChange={e => setFormValue('password', e.target.value)}
              type="password"
              name="user-password"
              autoComplete="autocomplete"
              placeholder="password"
              required
              minLength={4}
            />
          </FormField>
          <FormField>
            <input
              value={formValue.passwordConfirm}
              onChange={e => setFormValue('passwordConfirm', e.target.value)}
              type="password"
              name="user-password-confirm"
              autoComplete="autocomplete"
              placeholder="password"
              required
              minLength={4}
            />
          </FormField>

          <button type="submit">Sign In</button>
          <Link to="/">Go to sign in</Link>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
