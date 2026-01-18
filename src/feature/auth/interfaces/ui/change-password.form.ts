export interface changePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const changePaswordFormDefaults: changePasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}
