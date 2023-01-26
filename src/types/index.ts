export interface ITodo {
    id: number
    text: string
    checked: boolean
}

export type SignInFormValue = {
  email: string
  password: string
}

export type SignUpFormValue = SignInFormValue & {
  passwordConfirm: string
}