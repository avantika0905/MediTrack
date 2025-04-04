import { toast } from "@/components/ui/use-toast"

// Use environment variable with fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

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

// Upload API
export const uploadApi = {
  uploadImage: async (file: File): Promise<string> => {
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("Authentication required")
      }

      // Create form data
      const formData = new FormData()
      formData.append("file", file)

      console.log("Uploading image:", file.name)

      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        let errorMessage = "Failed to upload image"
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("Image uploaded successfully:", data.url)
      return data.url
    } catch (error) {
      return handleApiError(error)
    }
  },
}

