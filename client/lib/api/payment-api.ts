 
import { toast } from "@/components/ui/use-toast"

// Use environment variable with fallback

// Use environment variable with fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

 

export interface CreateOrderRequest {
  orderId: string
  amount: number
  currency: string
  receipt: string
  notes?: string
  customerInfo: {
    name: string
    email: string
    contact: string
  }
}

export interface CreateOrderResponse {
  razorpayOrderId: string
  amount: number
  currency: string
  receipt: string
  status: string
  key: string
}

export interface PaymentVerificationRequest {
  orderId: string
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}

export interface PaymentResponse {
  id: string
  orderId: string
  razorpayOrderId: string
  razorpayPaymentId: string
  amount: number
  status: string
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

// Payment API
export const paymentApi = {
  createOrder: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    try {
      console.log("Creating payment order with data:", data)

      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.")
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        let errorMessage = "Failed to create payment order"

        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        console.error("Failed to create payment order:", errorMessage)
        throw new Error(errorMessage)
      }

      const responseData = await response.json()
      console.log("Payment order created successfully:", responseData)
      return responseData
    } catch (error) {
      return handleApiError(error)
    }
  },

  verifyPayment: async (data: PaymentVerificationRequest): Promise<PaymentResponse> => {
    try {
      console.log("Verifying payment with data:", data)

      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.")
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        let errorMessage = "Failed to verify payment"

        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        console.error("Failed to verify payment:", errorMessage)
        throw new Error(errorMessage)
      }

      const responseData = await response.json()
      console.log("Payment verified successfully:", responseData)
      return responseData
    } catch (error) {
      return handleApiError(error)
    }
  },

  getPaymentByOrderId: async (orderId: string): Promise<PaymentResponse> => {
    try {
      console.log("Fetching payment details for order:", orderId)

      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.")
      }

      const response = await fetch(`${API_BASE_URL}/api/payments/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        let errorMessage = "Failed to fetch payment details"

        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        console.error("Failed to fetch payment details:", errorMessage)
        throw new Error(errorMessage)
      }

      const responseData = await response.json()
      console.log("Payment details fetched successfully:", responseData)
      return responseData
    } catch (error) {
      return handleApiError(error)
    }
  },
}

