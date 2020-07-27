export interface AuthState {
  isAuthenticated: boolean,
  email: string | null,
  token: string | null,
  error: string | null
}
