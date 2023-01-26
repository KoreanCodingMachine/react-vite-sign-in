import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import SignInUpForm from '../components/SignInUpForm'
import { useSignInUpForm, useSignInUpFormValidation } from '../hooks/useAuth'
import { SignInFormValue } from '../types'

const SignIn = () => {
  const {
    formValue,
    formValueValidationMessage,
    setFormValue,
    setFormValueValidationMessage,
  } = useSignInUpForm({
    email: '',
    password: '',
  } as SignInFormValue)
  const { formFieldValidations } = useSignInUpFormValidation()

  const formFields = useMemo(() => {
    return [
      {
        value: formValue.email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          let message = ''

          try {
            formFieldValidations.email.forEach(func => func(value))
          } catch (error: any) {
            console.log(error)
            message = error.message
          }

          setFormValueValidationMessage('email', message)
          setFormValue('email', value)
        },
        type: 'email',
        name: 'email',
        autoFocus: true,
        placeholder: 'email',
      },
      {
        value: formValue.password,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          let message = ''

          try {
            formFieldValidations.password.forEach(func => func(value))
          } catch (error: any) {
            console.log(error)
            message = error.message
          }

          setFormValueValidationMessage('password', message)
          setFormValue('password', value)
        },
        type: 'password',
        name: 'password',
        autoComplete: 'autocomplete',
        placeholder: 'password',
      },
    ]
  }, [formValue])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // alert('로그인 되었습니다.')
    console.log(formValueValidationMessage)
  }

  return (
    <SignInUpForm
      formFields={formFields}
      formValueValidationMessage={formValueValidationMessage}
      onSubmit={onSubmit}
      title="Sign-In"
    >
      <button type="submit">Sign In</button>
      <Link to="/sign-up">Go to sign up</Link>
    </SignInUpForm>
  )
}

export default SignIn
