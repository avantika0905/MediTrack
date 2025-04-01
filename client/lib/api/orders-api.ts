 
// import { toast } from "@/components/ui/use-toast"

// // const API_BASE_URL = "http://localhost:8080"

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export interface OrderItem {
//   medicineId: string
//   medicineName: string
//   quantity: number
//   price: number
//   total: number
// }

// export interface Order {
//   id: string
//   userId: string
//   items: OrderItem[]
//   totalAmount: number
//   status: string
//   orderDate: string
//   shippingAddress: string
//   paymentMethod: string
// }

// export interface OrderItemRequest {
//   medicineId: string
//   quantity: number
// }

// export interface OrderRequest {
//   items: OrderItemRequest[]
//   shippingAddress: string
//   paymentMethod: string
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

// // Orders API
// export const ordersApi = {
//   getAll: async (): Promise<Order[]> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/orders`, {
//         credentials: "include", // Include cookies
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

//   getById: async (id: string): Promise<Order> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
//         credentials: "include", // Include cookies
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to fetch order")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   getUserOrders: async (): Promise<Order[]> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/orders/user`, {
//         credentials: "include", // Include cookies
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to fetch user orders")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   create: async (data: OrderRequest): Promise<Order> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//         credentials: "include", // Include cookies
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

//   updateStatus: async (id: string, status: string): Promise<Order> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//         credentials: "include", // Include cookies
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Failed to update order status")
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },
// }












/************************************************************************************* */


// import { toast } from "@/components/ui/use-toast"

// // Use environment variable with fallback
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 

// // || "https://resident-carmine-avni-0ac5c272.koyeb.app"

// export interface OrderItem {
//   medicineId: string
//   medicineName: string
//   quantity: number
//   price: number
//   total: number
// }

// export interface Order {
//   id: string
//   userId: string
//   items: OrderItem[]
//   totalAmount: number
//   status: string
//   orderDate: string
//   shippingAddress: string
//   paymentMethod: string
//   // Additional properties for enhanced UI
//   estimatedDelivery?: Date
//   trackingNumber?: string
// }

// export interface OrderItemRequest {
//   medicineId: string
//   quantity: number
// }

// export interface OrderRequest {
//   items: OrderItemRequest[]
//   shippingAddress: string
//   paymentMethod: string
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

// // Helper function to get auth token
// const getAuthToken = () => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token") || ""
//   }
//   return ""
// }

// // Orders API
// export const ordersApi = {
//   getAll: async (): Promise<Order[]> => {
//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("Authentication required")
//       }

//       const response = await fetch(`${API_BASE_URL}/api/orders`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error("You don't have permission to access this resource")
//         }

//         let errorMessage = "Failed to fetch orders"
//         try {
//           const errorData = await response.json()
//           errorMessage = errorData.message || errorMessage
//         } catch (e) {
//           // If parsing fails, use status text
//           errorMessage = response.statusText || errorMessage
//         }

//         throw new Error(errorMessage)
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   getById: async (id: string): Promise<Order> => {
//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("Authentication required")
//       }

//       const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error("You don't have permission to access this resource")
//         }

//         let errorMessage = "Failed to fetch order"
//         try {
//           const errorData = await response.json()
//           errorMessage = errorData.message || errorMessage
//         } catch (e) {
//           // If parsing fails, use status text
//           errorMessage = response.statusText || errorMessage
//         }

//         throw new Error(errorMessage)
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   getUserOrders: async (): Promise<Order[]> => {
//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("Authentication required")
//       }

//       const response = await fetch(`${API_BASE_URL}/api/orders/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error("You don't have permission to access this resource")
//         }

//         let errorMessage = "Failed to fetch user orders"
//         try {
//           const errorData = await response.json()
//           errorMessage = errorData.message || errorMessage
//         } catch (e) {
//           // If parsing fails, use status text
//           errorMessage = response.statusText || errorMessage
//         }

//         throw new Error(errorMessage)
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   create: async (data: OrderRequest): Promise<Order> => {
//     try {
//       console.log("Creating order with items:", data.items)

//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("Authentication required")
//       }

//       const response = await fetch(`${API_BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error("You don't have permission to create an order")
//         }

//         // Try to parse error response
//         let errorMessage = "Failed to create order"
//         try {
//           const errorData = await response.json()
//           errorMessage = errorData.message || errorMessage
//         } catch (e) {
//           // If parsing fails, use status text
//           errorMessage = response.statusText || errorMessage
//         }

//         throw new Error(errorMessage)
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },

//   updateStatus: async (id: string, status: string): Promise<Order> => {
//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("Authentication required")
//       }

//       const response = await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status }),
//       })

//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error("You don't have permission to update this order")
//         }

//         let errorMessage = "Failed to update order status"
//         try {
//           const errorData = await response.json()
//           errorMessage = errorData.message || errorMessage
//         } catch (e) {
//           // If parsing fails, use status text
//           errorMessage = response.statusText || errorMessage
//         }

//         throw new Error(errorMessage)
//       }

//       return await response.json()
//     } catch (error) {
//       return handleApiError(error)
//     }
//   },
// }







import { toast } from "@/components/ui/use-toast"

// Use environment variable with fallback

// Use environment variable with fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export interface OrderItem {
  medicineId: string
  medicineName: string
  quantity: number
  price: number
  total: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: string
  orderDate: string
  shippingAddress: string
  paymentMethod: string
  // Additional properties for enhanced UI
  estimatedDelivery?: Date
  trackingNumber?: string
}

export interface OrderItemRequest {
  medicineId: string
  quantity: number
}

export interface OrderRequest {
  items: OrderItemRequest[]
  shippingAddress: string
  paymentMethod: string
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

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || ""
  }
  return ""
}

// Orders API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      console.log("Fetching all orders with token:", token ? "Token exists" : "No token")

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to access this resource")
        }

        let errorMessage = "Failed to fetch orders"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  getById: async (id: string): Promise<Order> => {
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      console.log("Fetching order by ID:", id)

      const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to access this resource")
        }

        let errorMessage = "Failed to fetch order"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  getUserOrders: async (): Promise<Order[]> => {
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      console.log("Fetching user orders with token:", token ? "Token exists" : "No token")

      const response = await fetch(`${API_BASE_URL}/api/orders/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to access this resource")
        }

        let errorMessage = "Failed to fetch user orders"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  create: async (data: OrderRequest): Promise<Order> => {
    try {
      console.log("Creating order with items:", data.items)

      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to create an order")
        }

        // Try to parse error response
        let errorMessage = "Failed to create order"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  updateStatus: async (id: string, status: string): Promise<Order> => {
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      const response = await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to update this order")
        }

        let errorMessage = "Failed to update order status"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },
}

