import { toast } from "@/components/ui/use-toast"
import type { Medicine } from "./medicines-api"

const API_BASE_URL = "http://localhost:8080"

export interface Order {
  id: string
  userId: string
  medicineId: string
  quantity: number
  orderDate: string
  medicine?: Medicine
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

// Orders API
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

