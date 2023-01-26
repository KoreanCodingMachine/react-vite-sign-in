import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import SignInUpForm from '../components/SignInUpForm'
import { useSignInUpForm, useSignInUpFormValidation } from '../hooks/useAuth'
import { SignUpFormValue } from '../types'

const SignUp = () => {
  const {
    formValue,
    formValueValidationMessage,
    setFormValue,
    setFormValueValidationMessage,
  } = useSignInUpForm({
    email: '',
    password: '',
    passwordConfirm: '',
  } as SignUpFormValue)
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
      {
        value: formValue.passwordConfirm,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          let message = ''

          try {
            formFieldValidations.passwordConfirm.forEach(func => {
              const result = func(value)

              if (typeof result === 'function') {
                result(formValue.password, '비밀번호')
              }
            })
          } catch (error: any) {
            console.log(error)
            message = error.message
          }

          setFormValueValidationMessage('passwordConfirm', message)
          setFormValue('passwordConfirm', value)
        },
        type: 'password',
        name: 'passwordConfirm',
        autoComplete: 'autocomplete',
        placeholder: 'password',
      },
    ]
  }, [formValue])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // alert('회원가입을 축하합니다.')
    console.log(formValueValidationMessage)
  }

  return (
    <SignInUpForm
      formFields={formFields}
      formValueValidationMessage={formValueValidationMessage}
      onSubmit={onSubmit}
      title="Sign-Up"
    >
      <button type="submit">Sign In</button>
      <Link to="/">Go to sign in</Link>
    </SignInUpForm>
  )
}

export default SignUp
