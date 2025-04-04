"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { uploadApi } from "@/lib/api/upload-api"
import { Loader2, Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onError?: (error: string) => void
}

export default function ImageUpload({ value, onChange, onError }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    // Create local preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    setIsUploading(true)
    try {
      const imageUrl = await uploadApi.uploadImage(file)
      onChange(imageUrl)
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      })
    } catch (error: any) {
      console.error("Upload failed:", error)
      if (onError) {
        onError(error.message || "Failed to upload image")
      }
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      })
      // Reset preview if upload fails
      setPreview(value || null)
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onChange("")
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="flex-1"
        />
        {isUploading ? (
          <Button disabled variant="outline" size="icon">
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        ) : preview ? (
          <Button variant="outline" size="icon" onClick={handleRemoveImage}>
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4" />
          </Button>
        )}
      </div>

      {preview && (
        <div className="relative mt-2 rounded-md overflow-hidden border border-border">
          <img src={preview || "/placeholder.svg"} alt="Medicine preview" className="w-full h-48 object-cover" />
        </div>
      )}

      {!preview && (
        <div className="border border-dashed border-border rounded-md p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No image uploaded. Click to select or drag and drop an image.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

