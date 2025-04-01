 
import { toast } from "@/components/ui/use-toast"

// const API_BASE_URL = "http://localhost:8080"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export interface MedicineRequest {
  name: string
  brand: string
  price: number
  stock: number
  description?: string
  image?: string
  category?: string
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
const getAuthHeader = () => {
  return {
    "Content-Type": "application/json",
    credentials: "include", // Include cookies
  }
}

// Medicines API
export const medicinesApi = {
  getAll: async (): Promise<Medicine[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines`, {
        credentials: "include", // Include cookies
      })

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
      const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch medicine")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  create: async (data: MedicineRequest): Promise<Medicine> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies
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

  update: async (id: string, data: Partial<MedicineRequest>): Promise<Medicine> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies
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

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
        method: "DELETE",
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to delete medicine")
      }
    } catch (error) {
      return handleApiError(error)
    }
  },

  search: async (query: string): Promise<Medicine[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines/search?query=${encodeURIComponent(query)}`, {
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to search medicines")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  getByCategory: async (category: string): Promise<Medicine[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines/category/${encodeURIComponent(category)}`, {
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch medicines by category")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },

  getUserMedicines: async (): Promise<Medicine[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines/user`, {
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch user medicines")
      }

      return await response.json()
    } catch (error) {
      return handleApiError(error)
    }
  },
}

