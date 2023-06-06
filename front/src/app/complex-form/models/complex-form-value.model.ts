export class ComplexFormValue {
  personalInfo!: {
    firstName: string,
    lastName: string
  };
  contactPreference!: string;
  email?: {
    email: string,
    confirm: string
  };
  loginInfo!: {
    username: string,
    password: string,
    confirmPassword:  string
  };
}
