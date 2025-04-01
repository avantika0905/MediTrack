 
"use client"

import { useEffect, useState } from "react"
import type { Order } from "@/lib/api/orders-api"
import { ordersApi } from "@/lib/api/orders-api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { formatDistanceToNow, addDays, format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/context/auth-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Download,
  ExternalLink,
  RefreshCw,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample delivery addresses for demo
const SAMPLE_ADDRESSES = [
  "123 Main Street, Apartment 4B, New York, NY 10001",
  "456 Park Avenue, Suite 201, Chicago, IL 60601",
  "789 Ocean Drive, Miami, FL 33139",
  "321 Mountain View, Denver, CO 80202",
  "555 Sunset Boulevard, Los Angeles, CA 90028",
]

// Sample delivery dates (5-7 days from order date)
const getEstimatedDeliveryDate = (orderDate: string) => {
  const date = new Date(orderDate)
  const deliveryDays = Math.floor(Math.random() * 3) + 5 // 5-7 days
  return addDays(date, deliveryDays)
}

// Get tracking status based on order status
const getTrackingStatus = (status: string, orderDate: string) => {
  const now = new Date()
  const date = new Date(orderDate)
  const daysSinceOrder = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (status === "COMPLETED" || status === "DELIVERED") {
    return {
      status: "Delivered",
      progress: 100,
      steps: [
        {
          name: "Order Placed",
          completed: true,
          date: format(date, "MMM dd, yyyy"),
        },
        {
          name: "Payment Confirmed",
          completed: true,
          date: format(addDays(date, 1), "MMM dd, yyyy"),
        },
        {
          name: "Processing",
          completed: true,
          date: format(addDays(date, 2), "MMM dd, yyyy"),
        },
        {
          name: "Shipped",
          completed: true,
          date: format(addDays(date, 3), "MMM dd, yyyy"),
        },
        {
          name: "Out for Delivery",
          completed: true,
          date: format(addDays(date, 5), "MMM dd, yyyy"),
        },
        {
          name: "Delivered",
          completed: true,
          date: format(addDays(date, 6), "MMM dd, yyyy"),
        },
      ],
    }
  } else if (status === "SHIPPED") {
    return {
      status: "Shipped",
      progress: 60,
      steps: [
        {
          name: "Order Placed",
          completed: true,
          date: format(date, "MMM dd, yyyy"),
        },
        {
          name: "Payment Confirmed",
          completed: true,
          date: format(addDays(date, 1), "MMM dd, yyyy"),
        },
        {
          name: "Processing",
          completed: true,
          date: format(addDays(date, 2), "MMM dd, yyyy"),
        },
        {
          name: "Shipped",
          completed: true,
          date: format(addDays(date, 3), "MMM dd, yyyy"),
        },
        {
          name: "Out for Delivery",
          completed: false,
          date: format(addDays(date, 5), "MMM dd, yyyy"),
        },
        {
          name: "Delivered",
          completed: false,
          date: format(addDays(date, 6), "MMM dd, yyyy"),
        },
      ],
    }
  } else if (status === "PROCESSING") {
    return {
      status: "Processing",
      progress: 40,
      steps: [
        {
          name: "Order Placed",
          completed: true,
          date: format(date, "MMM dd, yyyy"),
        },
        {
          name: "Payment Confirmed",
          completed: true,
          date: format(addDays(date, 1), "MMM dd, yyyy"),
        },
        {
          name: "Processing",
          completed: true,
          date: format(addDays(date, 2), "MMM dd, yyyy"),
        },
        {
          name: "Shipped",
          completed: false,
          date: format(addDays(date, 3), "MMM dd, yyyy"),
        },
        {
          name: "Out for Delivery",
          completed: false,
          date: format(addDays(date, 5), "MMM dd, yyyy"),
        },
        {
          name: "Delivered",
          completed: false,
          date: format(addDays(date, 6), "MMM dd, yyyy"),
        },
      ],
    }
  } else if (status === "PENDING") {
    return {
      status: "Pending",
      progress: 20,
      steps: [
        {
          name: "Order Placed",
          completed: true,
          date: format(date, "MMM dd, yyyy"),
        },
        {
          name: "Payment Confirmed",
          completed: false,
          date: format(addDays(date, 1), "MMM dd, yyyy"),
        },
        {
          name: "Processing",
          completed: false,
          date: format(addDays(date, 2), "MMM dd, yyyy"),
        },
        {
          name: "Shipped",
          completed: false,
          date: format(addDays(date, 3), "MMM dd, yyyy"),
        },
        {
          name: "Out for Delivery",
          completed: false,
          date: format(addDays(date, 5), "MMM dd, yyyy"),
        },
        {
          name: "Delivered",
          completed: false,
          date: format(addDays(date, 6), "MMM dd, yyyy"),
        },
      ],
    }
  } else if (status === "CANCELLED") {
    return {
      status: "Cancelled",
      progress: 0,
      steps: [
        {
          name: "Order Placed",
          completed: true,
          date: format(date, "MMM dd, yyyy"),
        },
        {
          name: "Cancelled",
          completed: true,
          date: format(addDays(date, 1), "MMM dd, yyyy"),
        },
      ],
    }
  } else {
    return {
      status: "Unknown",
      progress: 0,
      steps: [
        {
          name: "Order Placed",
          completed: true,
          date: format(date, "MMM dd, yyyy"),
        },
        { name: "Payment Confirmed", completed: false, date: "Pending" },
        { name: "Processing", completed: false, date: "Pending" },
        { name: "Shipped", completed: false, date: "Pending" },
        { name: "Out for Delivery", completed: false, date: "Pending" },
        { name: "Delivered", completed: false, date: "Pending" },
      ],
    }
  }
}

// Get status color based on order status
const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED":
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "CANCELLED":
    case "PAYMENT_FAILED":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "PROCESSING":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    case "SHIPPED":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

// Get status icon based on order status
const getStatusIcon = (status: string) => {
  switch (status) {
    case "DELIVERED":
    case "COMPLETED":
      return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    case "CANCELLED":
    case "PAYMENT_FAILED":
      return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
    case "PROCESSING":
      return <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    case "SHIPPED":
      return <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
    case "PENDING":
      return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
    default:
      return <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
  }
}

export default function OrderHistory() {
  const { auth } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")

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

  const fetchOrders = async () => {
    if (!auth.isAuthenticated || !auth.token) return

    try {
      setLoading(true)
      setError(null)

      console.log("Fetching orders with token:", auth.token ? "Token exists" : "No token")

      const data = await ordersApi.getUserOrders()
      console.log("Orders fetched:", data)

      // Sort orders by date (newest first)
      const sortedOrders = [...data].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())

      // Enhance orders with sample data for demo
      const enhancedOrders = sortedOrders.map((order) => ({
        ...order,
        shippingAddress: order.shippingAddress || SAMPLE_ADDRESSES[Math.floor(Math.random() * SAMPLE_ADDRESSES.length)],
        estimatedDelivery: getEstimatedDeliveryDate(order.orderDate),
        trackingNumber: `TRK${Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(7, "0")}`,
      }))

      setOrders(enhancedOrders)
      setLoading(false)
    } catch (error: any) {
      console.error("Failed to fetch orders:", error)
      setError(error.message || "Failed to fetch your orders. Please try again.")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mounted && auth.isAuthenticated) {
      fetchOrders()
    }
  }, [auth.isAuthenticated, mounted])

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return ["PENDING", "PROCESSING", "SHIPPED"].includes(order.status)
    if (activeTab === "completed") return ["COMPLETED", "DELIVERED"].includes(order.status)
    if (activeTab === "cancelled") return ["CANCELLED", "PAYMENT_FAILED"].includes(order.status)
    return true
  })

  if (!mounted || !auth.isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
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

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Order History</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchOrders} className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 flex justify-center">
            <Button onClick={fetchOrders}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Order History</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchOrders} className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="py-12 flex flex-col items-center">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">You haven&apos;t placed any orders yet.</p>
            <Link href="/medicines">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                Browse Medicines
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order History</CardTitle>
        <Button variant="outline" size="sm" onClick={fetchOrders} className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>

        <Accordion type="single" collapsible className="w-full">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No orders found in this category.</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const trackingStatus = getTrackingStatus(order.status, order.orderDate)

              return (
                <AccordionItem key={order.id} value={order.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center text-left">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <div className="ml-3">
                          <span className="font-medium">Order #{order.id.substring(0, 8)}</span>
                          <span className="text-sm block text-muted-foreground">
                            {formatDistanceToNow(new Date(order.orderDate), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col mt-2 md:mt-0 md:items-end">
                        <span className="font-medium">₹{order.totalAmount.toFixed(2)}</span>
                        <Badge className={`mt-1 ${getStatusColor(order.status)}`}>{order.status}</Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-2">
                      {/* Order Tracking */}
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <Truck className="h-4 w-4 mr-2" />
                          Order Tracking
                        </h4>

                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Status: {trackingStatus.status}</span>
                            <span>{trackingStatus.progress}%</span>
                          </div>
                          <Progress value={trackingStatus.progress} className="h-2" />
                        </div>

                        <div className="space-y-3 mt-4">
                          {trackingStatus.steps.map((step, index) => (
                            <div key={index} className="flex items-start">
                              <div
                                className={`mt-0.5 h-4 w-4 rounded-full ${
                                  step.completed ? "bg-primary" : "bg-muted-foreground/30"
                                } mr-3`}
                              ></div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${step.completed ? "" : "text-muted-foreground"}`}>
                                  {step.name}
                                </p>
                                <p className="text-xs text-muted-foreground">{step.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {order.trackingNumber && (
                          <div className="mt-4 text-sm">
                            <span className="text-muted-foreground">Tracking Number: </span>
                            <span className="font-medium">{order.trackingNumber}</span>
                          </div>
                        )}

                        {order.estimatedDelivery && (
                          <div className="mt-2 text-sm flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Estimated Delivery: </span>
                            <span className="font-medium ml-1">{format(order.estimatedDelivery, "MMMM dd, yyyy")}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Shipping Address */}
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            Shipping Address
                          </h4>
                          <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>

                          {/* Delivery Map Placeholder */}
                          <div className="mt-3 bg-muted h-32 rounded-md flex items-center justify-center">
                            <Button variant="outline" size="sm" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              View on Map
                            </Button>
                          </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Payment Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Method:</span>
                              <span>{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <Badge variant="outline" className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date:</span>
                              <span>{format(new Date(order.orderDate), "MMM dd, yyyy")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total Amount:</span>
                              <span className="font-medium">₹{order.totalAmount.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="text-xs">
                              <Download className="h-3 w-3 mr-1" />
                              Download Invoice
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">Order Items</h4>
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
                                    className="hover:underline text-primary flex items-center"
                                  >
                                    {item.medicineName}
                                    <ExternalLink className="h-3 w-3 ml-1" />
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

                      {/* Order Actions */}
                      <div className="flex flex-wrap justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                        {["PENDING", "PROCESSING"].includes(order.status) && (
                          <Button variant="destructive" size="sm">
                            Cancel Order
                          </Button>
                        )}
                        {["DELIVERED", "COMPLETED"].includes(order.status) && (
                          <Button variant="outline" size="sm">
                            Write Review
                          </Button>
                        )}
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                          Track Order
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}

