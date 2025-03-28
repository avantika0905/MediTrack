import { atom } from "recoil"

export interface User {
  id: string
  username: string
  roles: string[]
}

export interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
})

