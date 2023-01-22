import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, FormField } from '../components/styled/Form'

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
  const validator = {
    required(value: string, name: string) {
      if (!value) throw new Error(`${name} 반드시 입력해야 합니다.`)

      return true
    },
    minLength(value: string, minLength: number, name: string) {
      if (value.length < minLength)
        throw new Error(`${name} 최소 네 글자 이상 입력하세요.`)

      return true
    },
    emailPattern(value: string, name: string) {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value))
        throw new Error(`${name}은 이메일 형식에 맞게 입력하세요.`)

      return true
    },
    isEqual(value: any, name: string) {
      return (otherValue: any, otherName: string) => {
        if (value !== otherValue)
          throw new Error(`${name} ${otherName}과 동일해야 합니다.`)

        return true
      }
    },
  }
  const formFieldValidations = {
    email: [
      (value: string) => validator.required(value, '이메일은'),
      (value: string) => validator.emailPattern(value, '이메일은'),
    ],
    password: [
      (value: string) => validator.required(value, '비밀번호는'),
      (value: string) => validator.minLength(value, 4, '비밀번호는'),
    ],
    passwordConfirm: [
      (value: string) => validator.required(value, '비밀번호 확인은'),
      (value: string) => validator.minLength(value, 4, '비밀번호 확인은'),
      (value: string) => validator.isEqual(value, '비밀번호 확인은'),
    ],
  }
  const [formValueValidationMessage, _setFormValueValidationMessage] =
    useState<SignUpFormValue>({
      email: '',
      password: '',
      passwordConfirm: '',
    })

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

  const setFormValue = <K extends keyof SignUpFormValue>(
    key: K,
    value: SignUpFormValue[K]
  ) => {
    _setFormValue(prevFormValue => ({
      ...prevFormValue,
      [key]: value,
    }))
  }

  const setFormValueValidationMessage = <K extends keyof SignUpFormValue>(
    key: K,
    value: SignUpFormValue[K]
  ) => {
    _setFormValueValidationMessage(prevFormValue => ({
      ...prevFormValue,
      [key]: value,
    }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // alert('회원가입을 축하합니다.')
    console.log(formValueValidationMessage)
  }

  return (
    <div>
      <h3>Sign-Up</h3>

      <div className="form-wrapper">
        <Form onSubmit={onSubmit}>
          {formFields.map(field => {
            const name = field.name as keyof SignUpFormValue
            console.log(formValueValidationMessage[name])
            return (
              <FormField key={name}>
                <input {...field} />
                {formValueValidationMessage[name] ? (
                  <span style={{ color: 'red' }}>
                    * {formValueValidationMessage[name]}
                  </span>
                ) : null}
              </FormField>
            )
          })}

          <button type="submit">Sign In</button>
          <Link to="/">Go to sign in</Link>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
