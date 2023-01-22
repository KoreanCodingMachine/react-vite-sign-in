import axios from 'axios'

const { VITE_APP_API_ENDPOINT } = import.meta.env

type SignUpFormValue = {
  email: string
  password: string
  passwordConfirm: string
}

const instance = axios.create({
  baseURL: VITE_APP_API_ENDPOINT,
})

// instance.interceptors.request.use(() => {}, () => {})
// instance.interceptors.response.use(() => {}, () => {})

const signUp = (value: SignUpFormValue) => {
  return instance.post('/user/register', value)
}

const signIn = (value: Omit<SignUpFormValue, 'passwordConfirm'>) => {
  return instance.post('/user/login', value)
}