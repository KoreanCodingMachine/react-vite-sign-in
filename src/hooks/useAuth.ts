import { useState } from 'react'
import { validator } from '../utils/validator'

export const useSignInUpForm = <T extends Record<string, any>>(initialState: T) => {
  const [formValue, _setFormValue] = useState<T>(initialState)
  const keys = Object.keys(initialState) as unknown as (keyof T)[]
  const [formValueValidationMessage, _setFormValueValidationMessage] =
    useState(Object.fromEntries(keys.map((k) => ([k, '']))) as {
      [K in keyof T]: string
    })
  const setFormValue = <K extends keyof T>(
    key: K,
    value: T[K]
  ) => {
    _setFormValue(prevFormValue => ({
      ...prevFormValue,
      [key]: value,
    }))
  }

  const setFormValueValidationMessage = <K extends keyof T>(
    key: K,
    value: T[K]
  ) => {
    _setFormValueValidationMessage(prevFormValue => ({
      ...prevFormValue,
      [key]: value,
    }))
  }

  return {
    formValue,
    formValueValidationMessage,
    setFormValue,
    setFormValueValidationMessage
  }
}

export const useSignInUpFormValidation = () => {
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

  return { formFieldValidations }
}