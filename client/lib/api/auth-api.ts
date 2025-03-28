// import { toast } from "@/components/ui/use-toast"

// const API_BASE_URL = "http://localhost:8080"

// export interface LoginRequest {
//   username: string
//   password: string
// }

// export interface RegisterRequest {
//   username: string
//   password: string
//   roles?: string[]
// }

// export interface AuthResponse {
//   token: string
// }

// export interface UserResponse {
//   id: string
//   username: string
//   roles: string[]
// }

// // Helper function to handle API errors
// const handleApiError = (error: any) => {
//   console.error("API Error:", error)
//   const message = error.message || "An unexpected error occurred"
//   toast({
//     title: "Error",
//     description: message,
//     variant: "destructive",
//   })
//   throw error
// }

// // Auth API
// // export const authApi = {
// //   login: async (data: LoginRequest): Promise<AuthResponse> => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(data),
// //       })

// //       if (!response.ok) {
// //         const error = await response.json()
// //         throw new Error(error.message || "Login failed")
// //       }

// //       return await response.json()
// //     } catch (error) {
// //       return handleApiError(error)
// //     }
// //   },

// //   register: async (data: RegisterRequest): Promise<UserResponse> => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(data),
// //       })

// //       if (!response.ok) {
// //         const error = await response.json()
// //         throw new Error(error.message || "Registration failed")
// //       }

// //       return await response.json()
// //     } catch (error) {
// //       return handleApiError(error)
// //     }
// //   },
// // }
























































// export interface LoginRequest {
//   email: string
//   password: string
// }

// export interface RegisterRequest {
//   username: string
//   email: string
//   password: string
//   roles?: string[]
// }

// export const authApi = {
//   login: async (data: LoginRequest): Promise<AuthResponse> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) throw new Error("Login failed")
//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   register: async (data: RegisterRequest): Promise<UserResponse> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) throw new Error("Registration failed")
//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },
// }




























































// client/lib/api/auth-api.ts

import { toast } from "@/components/ui/use-toast"

const API_BASE_URL = "http://localhost:8080"

// Update interfaces to use email for login and include email in registration & response
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  roles?: string[]
}

export interface AuthResponse {
  token: string
}

export interface UserResponse {
  id: string
  username: string
  email: string
  roles: string[]
}

// Helper function to handle API errors
const handleApiError = (error: any) => {
  console.error("API Error:", error)
  const message = error.message || "An unexpected error occurred"
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  })
  throw error
}

// Auth API
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  register: async (data: RegisterRequest): Promise<UserResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Registration failed")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },
}
