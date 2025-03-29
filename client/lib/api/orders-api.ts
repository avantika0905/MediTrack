 
import { toast } from "@/components/ui/use-toast"

const API_BASE_URL = "http://localhost:8080"

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

// Orders API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        credentials: "include", // Include cookies
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

  getById: async (id: string): Promise<Order> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch order")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  getUserOrders: async (): Promise<Order[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/user`, {
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch user orders")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  create: async (data: OrderRequest): Promise<Order> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies
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

  updateStatus: async (id: string, status: string): Promise<Order> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update order status")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },
}

