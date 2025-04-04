 
// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import type { Medicine } from "@/lib/api/medicines-api"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ShoppingCart, Star } from "lucide-react"
// import { useCart } from "@/lib/context/cart-context"
// import { toast } from "@/components/ui/use-toast"
// import { Badge } from "@/components/ui/badge"

// interface MedicineCardProps {
//   medicine: Medicine
// }

// export default function MedicineCard({ medicine }: MedicineCardProps) {
//   const { addToCart } = useCart()
//   const [isAdding, setIsAdding] = useState(false)

//   const handleAddToCart = () => {
//     setIsAdding(true)

//     // Add to cart
//     addToCart({
//       id: medicine.id,
//       name: medicine.name,
//       brand: medicine.brand,
//       price: medicine.price,
//     })

//     toast({
//       title: "Added to cart",
//       description: `${medicine.name} has been added to your cart`,
//     })

//     setIsAdding(false)
//   }

//   // Generate a random rating for demo purposes
//   const rating = Math.floor(Math.random() * 10) / 2 + 3 // Random rating between 3 and 5

//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-md border-blue-100 dark:border-blue-900/50">
//       <Link href={`/medicines/${medicine.id}`}>
//         <div className="aspect-square overflow-hidden bg-blue-50 dark:bg-blue-900/20">
//           <img
//             src={medicine.image || "/placeholder.svg?height=300&width=300"}
//             alt={medicine.name}
//             className="h-full w-full object-cover transition-transform hover:scale-105"
//             width={300}
//             height={300}
//           />
//         </div>
//       </Link>
//       <CardContent className="p-4">
//         {medicine.stock <= 5 && medicine.stock > 0 && (
//           <Badge className="mb-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30">
//             Low Stock
//           </Badge>
//         )}
//         {medicine.stock <= 0 && (
//           <Badge className="mb-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30">
//             Out of Stock
//           </Badge>
//         )}
//         <Link href={`/medicines/${medicine.id}`}>
//           <h3 className="font-semibold text-lg line-clamp-1 hover:underline text-blue-700 dark:text-blue-400">
//             {medicine.name}
//           </h3>
//         </Link>
//         <p className="text-sm text-gray-600 dark:text-muted-foreground">{medicine.brand}</p>
//         <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1">{medicine.category || "General"}</p>

//         <div className="flex items-center mt-2">
//           <div className="flex text-yellow-400">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-current" : ""} ${
//                   i === Math.floor(rating) && rating % 1 > 0 ? "fill-current opacity-50" : ""
//                 }`}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-gray-600 dark:text-muted-foreground ml-1">
//             ({Math.floor(Math.random() * 100) + 10})
//           </span>
//         </div>

//         <p className="mt-2 font-bold text-lg text-blue-700 dark:text-blue-400">₹{medicine.price.toFixed(2)}</p>
//       </CardContent>
//       <CardFooter className="p-4 pt-0">
//         <Button
//           onClick={handleAddToCart}
//           className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//           disabled={isAdding || medicine.stock <= 0}
//         >
//           <ShoppingCart className="mr-2 h-4 w-4" />
//           {medicine.stock <= 0 ? "Out of Stock" : "Add to Cart"}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }





















"use client"

import { useState } from "react"
import Link from "next/link"
import type { Medicine } from "@/lib/api/medicines-api"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import ImagePreview from "@/components/image-preview"

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

  // Generate a random rating for demo purposes
  const rating = Math.floor(Math.random() * 10) / 2 + 3 // Random rating between 3 and 5

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-blue-100 dark:border-blue-900/50">
      <Link href={`/medicines/${medicine.id}`}>
        <div className="aspect-square overflow-hidden bg-blue-50 dark:bg-blue-900/20">
          <ImagePreview
            src={medicine.image || null}
            alt={medicine.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        {medicine.stock <= 5 && medicine.stock > 0 && (
          <Badge className="mb-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30">
            Low Stock
          </Badge>
        )}
        {medicine.stock <= 0 && (
          <Badge className="mb-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30">
            Out of Stock
          </Badge>
        )}
        <Link href={`/medicines/${medicine.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:underline text-blue-700 dark:text-blue-400">
            {medicine.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-muted-foreground">{medicine.brand}</p>
        <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1">{medicine.category || "General"}</p>

        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-current" : ""} ${
                  i === Math.floor(rating) && rating % 1 > 0 ? "fill-current opacity-50" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-muted-foreground ml-1">
            ({Math.floor(Math.random() * 100) + 10})
          </span>
        </div>

        <p className="mt-2 font-bold text-lg text-blue-700 dark:text-blue-400">₹{medicine.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          disabled={isAdding || medicine.stock <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {medicine.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}

