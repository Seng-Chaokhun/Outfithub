export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const registerFormDefaults: RegisterForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}
