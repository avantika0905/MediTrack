// "use client"

// import { useEffect, useState } from "react"
// import type { Medicine } from "@/lib/api/medicines-api"
// import { medicinesApi } from "@/lib/api/medicines-api"
// import { Button } from "@/components/ui/button"
// import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"
// import { useCart } from "@/lib/context/cart-context"
// import { toast } from "@/components/ui/use-toast"
// import { Badge } from "@/components/ui/badge"
// import { getSampleMedicineById } from "@/lib/utils/sample-data"

// interface MedicineDetailsProps {
//   id: string
// }

// export default function MedicineDetails({ id }: MedicineDetailsProps) {
//   const [medicine, setMedicine] = useState<Medicine | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [quantity, setQuantity] = useState(1)
//   const { addToCart } = useCart()
//   const [isAdding, setIsAdding] = useState(false)

//   useEffect(() => {
//     const fetchMedicine = async () => {
//       try {
//         const data = await medicinesApi.getById(id)
//         setMedicine(data)
//         setLoading(false)
//       } catch (error) {
//         console.error("Failed to fetch medicine:", error)
//         // Use sample data if API fails
//         const sampleMedicine = getSampleMedicineById(id)
//         setMedicine(sampleMedicine)
//         setLoading(false)
//       }
//     }

//     fetchMedicine()
//   }, [id])

//   const increaseQuantity = () => {
//     if (medicine && quantity < medicine.stock) {
//       setQuantity(quantity + 1)
//     }
//   }

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1)
//     }
//   }

//   const handleAddToCart = () => {
//     if (!medicine) return

//     setIsAdding(true)

//     // Add to cart
//     addToCart(
//       {
//         id: medicine.id,
//         name: medicine.name,
//         brand: medicine.brand,
//         price: medicine.price,
//       },
//       quantity,
//     )

//     toast({
//       title: "Added to cart",
//       description: `${medicine.name} has been added to your cart`,
//     })

//     setIsAdding(false)
//   }

//   if (!medicine) {
//     return null
//   }

//   return (
//     <div className="grid md:grid-cols-2 gap-8">
//       <div className="aspect-square overflow-hidden rounded-xl border">
//         <img
//           src={medicine.image || "/placeholder.svg?height=600&width=600"}
//           alt={medicine.name}
//           className="h-full w-full object-cover"
//           width={600}
//           height={600}
//         />
//       </div>

//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold">{medicine.name}</h1>
//           <p className="text-lg text-muted-foreground">{medicine.brand}</p>
//           {medicine.category && (
//             <Badge variant="outline" className="mt-2">
//               {medicine.category}
//             </Badge>
//           )}
//         </div>

//         <div className="text-2xl font-bold">₹{medicine.price.toFixed(2)}</div>

//         <div className="space-y-2">
//           <p className="text-sm text-muted-foreground">Availability:</p>
//           <p
//             className={`font-medium ${medicine.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
//           >
//             {medicine.stock > 0 ? `In Stock (${medicine.stock} available)` : "Out of Stock"}
//           </p>
//         </div>

//         <div className="border-t border-b py-6">
//           <p className="text-sm text-muted-foreground mb-2">Description:</p>
//           <p>{medicine.description || "No description available for this product."}</p>
//         </div>

//         {medicine.stock > 0 && (
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <p className="text-sm text-muted-foreground">Quantity:</p>
//               <div className="flex items-center">
//                 <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
//                   <MinusIcon className="h-4 w-4" />
//                 </Button>
//                 <span className="w-12 text-center">{quantity}</span>
//                 <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= medicine.stock}>
//                   <PlusIcon className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <Button onClick={handleAddToCart} className="w-full" size="lg" disabled={isAdding}>
//               <ShoppingCart className="mr-2 h-5 w-5" />
//               Add to Cart
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }











"use client"

import { useEffect, useState } from "react"
import type { Medicine } from "@/lib/api/medicines-api"
import { medicinesApi } from "@/lib/api/medicines-api"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { getSampleMedicineById } from "@/lib/utils/sample-data"
import ImagePreview from "@/components/image-preview"

interface MedicineDetailsProps {
  id: string
}

export default function MedicineDetails({ id }: MedicineDetailsProps) {
  const [medicine, setMedicine] = useState<Medicine | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const data = await medicinesApi.getById(id)
        setMedicine(data)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch medicine:", error)
        // Use sample data if API fails
        const sampleMedicine = getSampleMedicineById(id)
        setMedicine(sampleMedicine)
        setLoading(false)
      }
    }

    fetchMedicine()
  }, [id])

  const increaseQuantity = () => {
    if (medicine && quantity < medicine.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (!medicine) return

    setIsAdding(true)

    // Add to cart
    addToCart(
      {
        id: medicine.id,
        name: medicine.name,
        brand: medicine.brand,
        price: medicine.price,
      },
      quantity,
    )

    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart`,
    })

    setIsAdding(false)
  }

  if (!medicine) {
    return null
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="aspect-square overflow-hidden rounded-xl border">
        <ImagePreview src={medicine.image || null} alt={medicine.name} className="h-full w-full object-cover" />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{medicine.name}</h1>
          <p className="text-lg text-muted-foreground">{medicine.brand}</p>
          {medicine.category && (
            <Badge variant="outline" className="mt-2">
              {medicine.category}
            </Badge>
          )}
        </div>

        <div className="text-2xl font-bold">₹{medicine.price.toFixed(2)}</div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Availability:</p>
          <p
            className={`font-medium ${medicine.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {medicine.stock > 0 ? `In Stock (${medicine.stock} available)` : "Out of Stock"}
          </p>
        </div>

        <div className="border-t border-b py-6">
          <p className="text-sm text-muted-foreground mb-2">Description:</p>
          <p>{medicine.description || "No description available for this product."}</p>
        </div>

        {medicine.stock > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">Quantity:</p>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= medicine.stock}>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleAddToCart} className="w-full" size="lg" disabled={isAdding}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

