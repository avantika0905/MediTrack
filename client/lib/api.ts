// import { toast } from "@/components/ui/use-toast"

// const API_BASE_URL = "http://localhost:8080"

// export interface Medicine {
//   id: string
//   name: string
//   brand: string
//   price: number
//   stock: number
//   description?: string
//   image?: string
//   category?: string
// }

// export interface Order {
//   id: string
//   userId: string
//   medicineId: string
//   quantity: number
//   orderDate: string
//   medicine?: Medicine
// }

// export interface LoginRequest {
//   email: string
//   password: string
// }

// export interface RegisterRequest {
//   email: string
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

// // Helper function to get auth header
// const getAuthHeader = (token: string | null) => {
//   return token ? { Authorization: `Bearer ${token}` } : {}
// }

// // Auth API
// export const authApi = {
//   login: async (data: LoginRequest): Promise<AuthResponse> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Login failed")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   register: async (data: RegisterRequest): Promise<UserResponse> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Registration failed")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },
// }

// // Medicines API
// export const medicinesApi = {
//   getAll: async (): Promise<Medicine[]> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/medicines`)

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to fetch medicines")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   getById: async (id: string): Promise<Medicine> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`)

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to fetch medicine")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   create: async (data: Omit<Medicine, "id">, token: string): Promise<Medicine> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/medicines`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...getAuthHeader(token),
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to create medicine")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   update: async (id: string, data: Partial<Medicine>, token: string): Promise<Medicine> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           ...getAuthHeader(token),
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to update medicine")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   delete: async (id: string, token: string): Promise<string> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
//         method: "DELETE",
//         headers: getAuthHeader(token),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to delete medicine")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },
// }

// // Orders API
// export const ordersApi = {
//   getAll: async (token: string): Promise<Order[]> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/orders`, {
//         headers: getAuthHeader(token),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to fetch orders")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   create: async (data: { medicineId: string; quantity: number }, token: string): Promise<Order> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...getAuthHeader(token),
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to create order")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },
// }




















































































































// client/lib/api/auth-api.ts
import { toast } from "@/components/ui/use-toast"

const API_BASE_URL = "http://localhost:8080"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
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

// Helper function to get auth header
const getAuthHeader = (token: string | null) => {
  return token ? { Authorization: `Bearer ${token}` } : {}
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

// Medicines API
export interface Medicine {
  id: string
  name: string
  brand: string
  price: number
  stock: number
  description?: string
  image?: string
  category?: string
}

export const medicinesApi = {
  getAll: async (): Promise<Medicine[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch medicines")
      }
      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  getById: async (id: string): Promise<Medicine> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch medicine")
      }
      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  create: async (data: Omit<Medicine, "id">, token: string): Promise<Medicine> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(token),
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create medicine")
      }
      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  update: async (id: string, data: Partial<Medicine>, token: string): Promise<Medicine> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(token),
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update medicine")
      }
      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  delete: async (id: string, token: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(token),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to delete medicine")
      }
      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },
}

// Orders API
export interface Order {
  id: string
  userId: string
  medicineId: string
  quantity: number
  orderDate: string
  medicine?: Medicine
}

export const ordersApi = {
  getAll: async (token: string): Promise<Order[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: getAuthHeader(token),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch orders")
      }
      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  create: async (data: { medicineId: string; quantity: number }, token: string): Promise<Order> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(token),
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create order")
      }
      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },
}
