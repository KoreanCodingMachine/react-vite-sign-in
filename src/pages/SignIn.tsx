import { Link } from 'react-router-dom'
import { Form, FormField } from '../components/styled/Form'

const SignIn = () => {
  return (
    <div>
      <h3>Sign-In</h3>

      <div className="form-wrapper">
        <Form>
          <FormField>
            <input
              type="email"
              name="user-email"
              autoFocus
              placeholder="email"
            />
          </FormField>
          <FormField>
            <input
              type="password"
              name="user-password"
              autoComplete="autocomplete"
              placeholder="password"
            />
          </FormField>

          <button type="submit">Sign In</button>
          <Link to="/sign-up">Go to sign up</Link>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
