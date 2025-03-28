// "use client"

// import { useEffect, useState } from "react"
// import type { Order } from "@/lib/api/orders-api"
// import type { Medicine } from "@/lib/api/medicines-api"
// import { ordersApi } from "@/lib/api/orders-api"
// import { medicinesApi } from "@/lib/api/medicines-api"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Card, CardContent } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
// import { useRouter } from "next/navigation"
// import { formatDistanceToNow } from "date-fns"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { useAuth } from "@/lib/context/auth-context"
// import { getSampleOrders, getSampleMedicines } from "@/lib/utils/sample-data"

// export default function OrderHistory() {
//   const { auth } = useAuth()
//   const router = useRouter()
//   const [orders, setOrders] = useState<Order[]>([])
//   const [medicines, setMedicines] = useState<Record<string, Medicine>>({})
//   const [loading, setLoading] = useState(true)
//   const [mounted, setMounted] = useState(false)

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (mounted && !auth.isAuthenticated) {
//       router.push("/auth/login")
//     }
//   }, [auth.isAuthenticated, router, mounted])

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!auth.token) return

//       try {
//         const data = await ordersApi.getAll(auth.token)

//         // If API returns empty data, use sample data
//         if (data.length > 0) {
//           setOrders(data)
//         } else {
//           setOrders(getSampleOrders())
//         }

//         // Fetch medicine details for each order
//         const medicineIds = [...new Set(data.map((order) => order.medicineId))]
//         const medicineDetails: Record<string, Medicine> = {}

//         for (const id of medicineIds) {
//           try {
//             const medicine = await medicinesApi.getById(id)
//             medicineDetails[id] = medicine
//           } catch (error) {
//             console.error(`Failed to fetch medicine ${id}:`, error)
//           }
//         }

//         // If no medicine details were fetched, use sample data
//         if (Object.keys(medicineDetails).length === 0) {
//           const sampleMedicines = getSampleMedicines()
//           for (const medicine of sampleMedicines) {
//             medicineDetails[medicine.id] = medicine
//           }
//         }

//         setMedicines(medicineDetails)
//         setLoading(false)
//       } catch (error) {
//         console.error("Failed to fetch orders:", error)
//         setOrders(getSampleOrders())

//         const sampleMedicines = getSampleMedicines()
//         const medicineDetails: Record<string, Medicine> = {}
//         for (const medicine of sampleMedicines) {
//           medicineDetails[medicine.id] = medicine
//         }

//         setMedicines(medicineDetails)
//         setLoading(false)
//       }
//     }

//     if (mounted && auth.isAuthenticated) {
//       fetchOrders()
//     }
//   }, [auth.token, auth.isAuthenticated, mounted])

//   if (!mounted || !auth.isAuthenticated) {
//     return null
//   }

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="p-6">
//           <div className="space-y-4">
//             <Skeleton className="h-8 w-full" />
//             <Skeleton className="h-8 w-full" />
//             <Skeleton className="h-8 w-full" />
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   if (orders.length === 0) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-center">
//           <p className="text-muted-foreground py-8">You haven&apos;t placed any orders yet.</p>
//           <Link href="/medicines">
//             <Button>Browse Medicines</Button>
//           </Link>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardContent className="p-6">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Medicine</TableHead>
//               <TableHead>Quantity</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders.map((order) => {
//               const medicine = medicines[order.medicineId]
//               return (
//                 <TableRow key={order.id}>
//                   <TableCell className="font-medium">{order.id}</TableCell>
//                   <TableCell>
//                     {medicine ? (
//                       <Link href={`/medicines/${order.medicineId}`} className="hover:underline text-primary">
//                         {medicine.name}
//                       </Link>
//                     ) : (
//                       "Unknown Medicine"
//                     )}
//                   </TableCell>
//                   <TableCell>{order.quantity}</TableCell>
//                   <TableCell>{medicine ? `₹${(medicine.price * order.quantity).toFixed(2)}` : "N/A"}</TableCell>
//                   <TableCell>{formatDistanceToNow(new Date(order.orderDate), { addSuffix: true })}</TableCell>
//                 </TableRow>
//               )
//             })}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }


















































"use client"

import { useEffect, useState } from "react"
import type { Order } from "@/lib/api/orders-api"
import { ordersApi } from "@/lib/api/orders-api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/context/auth-context"

export default function OrderHistory() {
  const { auth } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !auth.isAuthenticated) {
      router.push("/auth/login")
    }
  }, [auth.isAuthenticated, router, mounted])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.isAuthenticated) return

      try {
        const data = await ordersApi.getUserOrders()
        setOrders(data)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
        setLoading(false)
      }
    }

    if (mounted && auth.isAuthenticated) {
      fetchOrders()
    }
  }, [auth.isAuthenticated, mounted])

  if (!mounted || !auth.isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground py-8">You haven&apos;t placed any orders yet.</p>
          <Link href="/medicines">
            <Button>Browse Medicines</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(order.orderDate), { addSuffix: true })}</TableCell>
                <TableCell>{order.items.length} items</TableCell>
                <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

