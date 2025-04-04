"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ImagePreviewProps {
  src: string | null
  alt?: string
  className?: string
  fallback?: React.ReactNode
}

export default function ImagePreview({ src, alt = "Image", className, fallback }: ImagePreviewProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!src) {
      setLoading(false)
      setError(true)
      return
    }

    const img = new Image()
    img.src = src

    img.onload = () => {
      setLoading(false)
      setError(false)
    }

    img.onerror = () => {
      setLoading(false)
      setError(true)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  if (!src || error) {
    return (
      fallback || (
        <div className={cn("flex items-center justify-center bg-muted rounded-md", className)}>
          <span className="text-muted-foreground text-sm">No image available</span>
        </div>
      )
    )
  }

  return (
    <>
      {loading && <Skeleton className={cn("rounded-md", className)} />}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "rounded-md object-cover transition-opacity duration-300",
          loading ? "opacity-0 h-0" : "opacity-100",
          className,
        )}
      />
    </>
  )
}

