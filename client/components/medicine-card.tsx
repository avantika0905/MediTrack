"use client"

import { useState } from "react"
import Link from "next/link"
import type { Medicine } from "@/lib/api/medicines-api"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { toast } from "@/components/ui/use-toast"

interface MedicineCardProps {
  medicine: Medicine
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    // Add to cart
    addToCart({
      id: medicine.id,
      name: medicine.name,
      brand: medicine.brand,
      price: medicine.price,
    })

    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart`,
    })

    setIsAdding(false)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/medicines/${medicine.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={medicine.image || "/placeholder.svg?height=300&width=300"}
            alt={medicine.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            width={300}
            height={300}
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/medicines/${medicine.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:underline">{medicine.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{medicine.brand}</p>
        <p className="text-sm text-muted-foreground mt-1">{medicine.category || "General"}</p>
        <p className="mt-2 font-bold text-lg">₹{medicine.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" disabled={isAdding || medicine.stock <= 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {medicine.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}

