// "use client"

// import { useEffect, useState } from "react"
// import type { Order } from "@/lib/api/orders-api"
// import { ordersApi } from "@/lib/api/orders-api"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Card, CardContent } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
// import { useRouter } from "next/navigation"
// import { formatDistanceToNow } from "date-fns"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { useAuth } from "@/lib/context/auth-context"

// export default function OrderHistory() {
//   const { auth } = useAuth()
//   const router = useRouter()
//   const [orders, setOrders] = useState<Order[]>([])
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
//       if (!auth.isAuthenticated) return

//       try {
//         const data = await ordersApi.getUserOrders()
//         setOrders(data)
//         setLoading(false)
//       } catch (error) {
//         console.error("Failed to fetch orders:", error)
//         setLoading(false)
//       }
//     }

//     if (mounted && auth.isAuthenticated) {
//       fetchOrders()
//     }
//   }, [auth.isAuthenticated, mounted])

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
//               <TableHead>Date</TableHead>
//               <TableHead>Items</TableHead>
//               <TableHead>Total</TableHead>
//               <TableHead>Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell className="font-medium">{order.id}</TableCell>
//                 <TableCell>{formatDistanceToNow(new Date(order.orderDate), { addSuffix: true })}</TableCell>
//                 <TableCell>{order.items.length} items</TableCell>
//                 <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       order.status === "DELIVERED"
//                         ? "bg-green-100 text-green-800"
//                         : order.status === "CANCELLED"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-blue-100 text-blue-800"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/lib/api/orders-api";
import { ordersApi } from "@/lib/api/orders-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/auth-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function OrderHistory() {
  const { auth } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !auth.isAuthenticated) {
      router.push("/auth/login");
    }
  }, [auth.isAuthenticated, router, mounted]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.isAuthenticated) return;

      try {
        const data = await ordersApi.getUserOrders();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      }
    };

    if (mounted && auth.isAuthenticated) {
      fetchOrders();
    }
  }, [auth.isAuthenticated, mounted]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  if (!mounted || !auth.isAuthenticated) {
    return null;
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
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground py-8">
            You haven&apos;t placed any orders yet.
          </p>
          <Link href="/medicines">
            <Button>Browse Medicines</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {orders.map((order) => (
            <AccordionItem key={order.id} value={order.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center text-left">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      Order #{order.id.substring(0, 8)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(order.orderDate), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col mt-2 md:mt-0 md:items-end">
                    <span className="font-medium">
                      ₹{order.totalAmount.toFixed(2)}
                    </span>
                    <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        Shipping Address
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        Payment Method
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Order Items</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map((item) => (
                          <TableRow key={item.medicineId}>
                            <TableCell>
                              <Link
                                href={`/medicines/${item.medicineId}`}
                                className="hover:underline text-primary"
                              >
                                {item.medicineName}
                              </Link>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>₹{item.price.toFixed(2)}</TableCell>
                            <TableCell>₹{item.total.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
