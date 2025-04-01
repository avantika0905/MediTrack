 

// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "@/lib/context/auth-context"
// import { useCart } from "@/lib/context/cart-context"
// import { ordersApi } from "@/lib/api/orders-api"
// import { paymentApi } from "@/lib/api/payment-api"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Trash, MinusCircle, PlusCircle, CreditCard, Loader2 } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

// // Declare Razorpay as a global variable
// declare global {
//   interface Window {
//     Razorpay: any
//   }
// }

// export default function CartItems() {
//   const { cart, updateQuantity, removeItem, clearCart } = useCart()
//   const { auth } = useAuth()
//   const router = useRouter()
//   const [isCheckingOut, setIsCheckingOut] = useState(false)
//   const [mounted, setMounted] = useState(false)
//   const [shippingAddress, setShippingAddress] = useState("")
//   const [paymentMethod, setPaymentMethod] = useState("RAZORPAY")
//   const [customerName, setCustomerName] = useState("")
//   const [customerEmail, setCustomerEmail] = useState("")
//   const [customerPhone, setCustomerPhone] = useState("")
//   const [activeTab, setActiveTab] = useState("shipping")
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false)

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true)

//     // Check if Razorpay is already loaded
//     if (window.Razorpay) {
//       console.log("Razorpay already loaded")
//       setRazorpayLoaded(true)
//     } else {
//       // Load Razorpay script
//       console.log("Loading Razorpay script")
//       const script = document.createElement("script")
//       script.src = "https://checkout.razorpay.com/v1/checkout.js"
//       script.async = true
//       script.onload = () => {
//         console.log("Razorpay script loaded successfully")
//         setRazorpayLoaded(true)
//       }
//       script.onerror = () => {
//         console.error("Failed to load Razorpay script")
//       }
//       document.body.appendChild(script)

//       return () => {
//         if (document.body.contains(script)) {
//           document.body.removeChild(script)
//         }
//       }
//     }
//   }, [])

//   // Set default values when auth is loaded
//   useEffect(() => {
//     if (auth.user) {
//       setCustomerName(auth.user.username || "")
//       setCustomerEmail(auth.user.email || "")
//     }
//   }, [auth.user])

//   const calculateTotal = () => {
//     return cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
//   }

//   const validateCheckoutForm = () => {
//     if (!shippingAddress) {
//       toast({
//         title: "Shipping address required",
//         description: "Please enter a shipping address.",
//         variant: "destructive",
//       })
//       return false
//     }

//     if (!customerName || !customerEmail || !customerPhone) {
//       toast({
//         title: "Customer information required",
//         description: "Please fill in all customer information fields.",
//         variant: "destructive",
//       })
//       return false
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(customerEmail)) {
//       toast({
//         title: "Invalid email",
//         description: "Please enter a valid email address.",
//         variant: "destructive",
//       })
//       return false
//     }

//     // Basic phone validation (10 digits)
//     const phoneRegex = /^\d{10}$/
//     if (!phoneRegex.test(customerPhone)) {
//       toast({
//         title: "Invalid phone number",
//         description: "Please enter a valid 10-digit phone number.",
//         variant: "destructive",
//       })
//       return false
//     }

//     return true
//   }

//   const handleRazorpayPayment = async (orderId: string) => {
//     try {
//       console.log("Initializing Razorpay payment for order:", orderId)

//       if (!window.Razorpay) {
//         console.error("Razorpay is not loaded")
//         toast({
//           title: "Payment Error",
//           description: "Payment gateway is not available. Please try again later.",
//           variant: "destructive",
//         })
//         setIsCheckingOut(false)
//         return
//       }

//       // Create Razorpay order
//       const orderResponse = await paymentApi.createOrder({
//         orderId,
//         amount: calculateTotal(),
//         currency: "INR",
//         receipt: `receipt_${orderId}`,
//         notes: "Payment for medicines", // Simple string that will be converted to object in backend
//         customerInfo: {
//           name: customerName,
//           email: customerEmail,
//           contact: customerPhone,
//         },
//       })

//       console.log("Razorpay order created:", orderResponse)

//       // Initialize Razorpay options
//       const options = {
//         key: orderResponse.key,
//         amount: orderResponse.amount * 100, // Amount in paise
//         currency: orderResponse.currency,
//         name: "MediTrack",
//         description: "Medicine Purchase",
//         order_id: orderResponse.razorpayOrderId,
//         prefill: {
//           name: customerName,
//           email: customerEmail,
//           contact: customerPhone,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//         handler: async (response: any) => {
//           console.log("Payment successful, verifying...", response)
//           try {
//             // Verify payment
//             await paymentApi.verifyPayment({
//               orderId,
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             })

//             // Clear cart and show success message
//             clearCart()
//             toast({
//               title: "Payment successful",
//               description: "Your order has been placed successfully.",
//             })

//             // Redirect to profile page
//             router.push("/profile")
//           } catch (error) {
//             console.error("Payment verification failed:", error)
//             toast({
//               title: "Payment verification failed",
//               description: "There was an error verifying your payment. Please contact support.",
//               variant: "destructive",
//             })
//             setIsCheckingOut(false)
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             console.log("Payment modal dismissed")
//             setIsCheckingOut(false)
//             toast({
//               title: "Payment cancelled",
//               description: "You have cancelled the payment. Your order is still pending.",
//               variant: "destructive",
//             })
//           },
//         },
//       }

//       console.log("Initializing Razorpay with options:", options)

//       // Initialize Razorpay
//       const razorpay = new window.Razorpay(options)
//       razorpay.on("payment.failed", (response: any) => {
//         console.error("Payment failed:", response.error)
//         toast({
//           title: "Payment failed",
//           description: response.error.description || "Your payment has failed. Please try again.",
//           variant: "destructive",
//         })
//         setIsCheckingOut(false)
//       })

//       razorpay.open()
//       console.log("Razorpay checkout opened")
//     } catch (error) {
//       console.error("Razorpay initialization failed:", error)
//       setIsCheckingOut(false)
//       toast({
//         title: "Payment initialization failed",
//         description: "There was an error initializing the payment. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleCheckout = async () => {
//     if (!auth.isAuthenticated) {
//       toast({
//         title: "Login required",
//         description: "Please login to checkout.",
//         variant: "destructive",
//       })
//       router.push("/auth/login")
//       return
//     }

//     if (!validateCheckoutForm()) {
//       return
//     }

//     setIsCheckingOut(true)
//     console.log("Starting checkout process...")

//     try {
//       // Create order items from cart
//       const orderItems = cart.items.map((item) => ({
//         medicineId: item.id,
//         quantity: item.quantity,
//       }))

//       console.log("Creating order with items:", orderItems)

//       // Create order
//       const order = await ordersApi.create({
//         items: orderItems,
//         shippingAddress,
//         paymentMethod,
//       })

//       console.log("Order created successfully:", order)

//       // Process payment based on selected method
//       if (paymentMethod === "RAZORPAY" || paymentMethod === "UPI") {
//         console.log("Processing payment with Razorpay")
//         await handleRazorpayPayment(order.id)
//       } else {
//         // For COD or other payment methods
//         console.log("Processing COD payment")
//         clearCart()
//         toast({
//           title: "Order placed successfully",
//           description: "Your order has been placed successfully with Cash on Delivery.",
//         })
//         router.push("/profile")
//       }
//     } catch (error) {
//       console.error("Checkout failed:", error)
//       setIsCheckingOut(false)
//       toast({
//         title: "Checkout failed",
//         description: "There was an error processing your order. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const nextStep = () => {
//     if (activeTab === "shipping") {
//       if (!shippingAddress) {
//         toast({
//           title: "Shipping address required",
//           description: "Please enter a shipping address.",
//           variant: "destructive",
//         })
//         return
//       }
//       setActiveTab("payment")
//     }
//   }

//   const prevStep = () => {
//     if (activeTab === "payment") {
//       setActiveTab("shipping")
//     }
//   }

//   if (!mounted) {
//     return null
//   }

//   if (cart.items.length === 0) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-center">
//           <p className="text-muted-foreground py-8">Your cart is empty.</p>
//           <Link href="/medicines">
//             <Button>Browse Medicines</Button>
//           </Link>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardContent className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Total</TableHead>
//                 <TableHead></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {cart.items.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <div className="flex flex-col">
//                       <Link href={`/medicines/${item.id}`} className="font-medium hover:underline text-primary">
//                         {item.name}
//                       </Link>
//                       <span className="text-sm text-muted-foreground">{item.brand}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>₹{item.price.toFixed(2)}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         disabled={item.quantity <= 1}
//                       >
//                         <MinusCircle className="h-4 w-4" />
//                       </Button>
//                       <span>{item.quantity}</span>
//                       <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
//                         <PlusCircle className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
//                   <TableCell>
//                     <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
//                       <Trash className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-2 mb-6">
//               <TabsTrigger value="shipping">Shipping</TabsTrigger>
//               <TabsTrigger value="payment">Payment</TabsTrigger>
//             </TabsList>

//             <TabsContent value="shipping" className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="shippingAddress" className="text-sm font-medium">
//                   Shipping Address
//                 </Label>
//                 <Textarea
//                   id="shippingAddress"
//                   value={shippingAddress}
//                   onChange={(e) => setShippingAddress(e.target.value)}
//                   placeholder="Enter your complete shipping address"
//                   className="min-h-[100px]"
//                   required
//                 />
//               </div>

//               <div className="flex justify-end mt-4">
//                 <Button onClick={nextStep}>Continue to Payment</Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="payment" className="space-y-4">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="customerName" className="text-sm font-medium">
//                     Full Name
//                   </Label>
//                   <Input
//                     id="customerName"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="customerEmail" className="text-sm font-medium">
//                     Email
//                   </Label>
//                   <Input
//                     id="customerEmail"
//                     type="email"
//                     value={customerEmail}
//                     onChange={(e) => setCustomerEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="customerPhone" className="text-sm font-medium">
//                     Phone Number
//                   </Label>
//                   <Input
//                     id="customerPhone"
//                     value={customerPhone}
//                     onChange={(e) => setCustomerPhone(e.target.value)}
//                     placeholder="Enter your 10-digit phone number"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="paymentMethod" className="text-sm font-medium">
//                     Payment Method
//                   </Label>
//                   <Select value={paymentMethod} onValueChange={setPaymentMethod}>
//                     <SelectTrigger id="paymentMethod">
//                       <SelectValue placeholder="Select payment method" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="RAZORPAY">Credit/Debit Card (Razorpay)</SelectItem>
//                       <SelectItem value="UPI">UPI (Razorpay)</SelectItem>
//                       <SelectItem value="COD">Cash on Delivery</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="flex justify-between mt-4">
//                 <Button variant="outline" onClick={prevStep}>
//                   Back to Shipping
//                 </Button>
//                 <Button onClick={handleCheckout} disabled={isCheckingOut}>
//                   {isCheckingOut ? "Processing..." : "Complete Payment"}
//                 </Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//         <CardFooter className="flex flex-col sm:flex-row justify-between p-6 border-t">
//           <div className="mb-4 sm:mb-0">
//             <p className="text-lg font-semibold">Total: ₹{calculateTotal().toFixed(2)}</p>
//             <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout</p>
//           </div>
//           {activeTab === "shipping" ? (
//             <Button onClick={nextStep} size="lg">
//               Continue to Payment
//             </Button>
//           ) : (
//             <Button onClick={handleCheckout} disabled={isCheckingOut} size="lg">
//               {isCheckingOut ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <CreditCard className="mr-2 h-5 w-5" />
//                   Complete Payment
//                 </>
//               )}
//             </Button>
//           )}
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }


//************************************************************************************* */





// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "@/lib/context/auth-context"
// import { useCart } from "@/lib/context/cart-context"
// import { ordersApi } from "@/lib/api/orders-api"
// import { paymentApi } from "@/lib/api/payment-api"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Trash, MinusCircle, PlusCircle, CreditCard, Loader2, ShoppingBag } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// // Declare Razorpay as a global variable
// declare global {
//   interface Window {
//     Razorpay: any
//   }
// }

// export default function CartItems() {
//   const { cart, updateQuantity, removeItem, clearCart } = useCart()
//   const { auth } = useAuth()
//   const router = useRouter()
//   const [isCheckingOut, setIsCheckingOut] = useState(false)
//   const [mounted, setMounted] = useState(false)
//   const [shippingAddress, setShippingAddress] = useState("")
//   const [paymentMethod, setPaymentMethod] = useState("RAZORPAY")
//   const [customerName, setCustomerName] = useState("")
//   const [customerEmail, setCustomerEmail] = useState("")
//   const [customerPhone, setCustomerPhone] = useState("")
//   const [activeTab, setActiveTab] = useState("shipping")
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true)

//     // Check if Razorpay is already loaded
//     if (window.Razorpay) {
//       console.log("Razorpay already loaded")
//       setRazorpayLoaded(true)
//     } else {
//       // Load Razorpay script
//       console.log("Loading Razorpay script")
//       const script = document.createElement("script")
//       script.src = "https://checkout.razorpay.com/v1/checkout.js"
//       script.async = true
//       script.onload = () => {
//         console.log("Razorpay script loaded successfully")
//         setRazorpayLoaded(true)
//       }
//       script.onerror = () => {
//         console.error("Failed to load Razorpay script")
//         setError("Failed to load payment gateway. Please try again later.")
//       }
//       document.body.appendChild(script)

//       return () => {
//         if (document.body.contains(script)) {
//           document.body.removeChild(script)
//         }
//       }
//     }
//   }, [])

//   // Set default values when auth is loaded
//   useEffect(() => {
//     if (auth.user) {
//       setCustomerName(auth.user.username || "")
//       setCustomerEmail(auth.user.email || "")
//     }
//   }, [auth.user])

//   const calculateTotal = () => {
//     return cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
//   }

//   const validateCheckoutForm = () => {
//     if (!shippingAddress) {
//       toast({
//         title: "Shipping address required",
//         description: "Please enter a shipping address.",
//         variant: "destructive",
//       })
//       return false
//     }

//     if (!customerName || !customerEmail || !customerPhone) {
//       toast({
//         title: "Customer information required",
//         description: "Please fill in all customer information fields.",
//         variant: "destructive",
//       })
//       return false
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(customerEmail)) {
//       toast({
//         title: "Invalid email",
//         description: "Please enter a valid email address.",
//         variant: "destructive",
//       })
//       return false
//     }

//     // Basic phone validation (10 digits)
//     const phoneRegex = /^\d{10}$/
//     if (!phoneRegex.test(customerPhone)) {
//       toast({
//         title: "Invalid phone number",
//         description: "Please enter a valid 10-digit phone number.",
//         variant: "destructive",
//       })
//       return false
//     }

//     return true
//   }

//   const handleRazorpayPayment = async (orderId: string) => {
//     try {
//       console.log("Initializing Razorpay payment for order:", orderId)

//       if (!window.Razorpay) {
//         console.error("Razorpay is not loaded")
//         toast({
//           title: "Payment Error",
//           description: "Payment gateway is not available. Please try again later.",
//           variant: "destructive",
//         })
//         setIsCheckingOut(false)
//         return
//       }

//       // Create Razorpay order
//       const orderResponse = await paymentApi.createOrder({
//         orderId,
//         amount: calculateTotal(),
//         currency: "INR",
//         receipt: `receipt_${orderId}`,
//         notes: "Payment for medicines", // Simple string that will be converted to object in backend
//         customerInfo: {
//           name: customerName,
//           email: customerEmail,
//           contact: customerPhone,
//         },
//       })

//       console.log("Razorpay order created:", orderResponse)

//       // Initialize Razorpay options
//       const options = {
//         key: orderResponse.key,
//         amount: orderResponse.amount * 100, // Amount in paise
//         currency: orderResponse.currency,
//         name: "MediTrack",
//         description: "Medicine Purchase",
//         order_id: orderResponse.razorpayOrderId,
//         prefill: {
//           name: customerName,
//           email: customerEmail,
//           contact: customerPhone,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//         handler: async (response: any) => {
//           console.log("Payment successful, verifying...", response)
//           try {
//             // Verify payment
//             await paymentApi.verifyPayment({
//               orderId,
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             })

//             // Clear cart and show success message
//             clearCart()
//             toast({
//               title: "Payment successful",
//               description: "Your order has been placed successfully.",
//             })

//             // Redirect to profile page
//             router.push("/profile")
//           } catch (error) {
//             console.error("Payment verification failed:", error)
//             toast({
//               title: "Payment verification failed",
//               description: "There was an error verifying your payment. Please contact support.",
//               variant: "destructive",
//             })
//             setIsCheckingOut(false)
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             console.log("Payment modal dismissed")
//             setIsCheckingOut(false)
//             toast({
//               title: "Payment cancelled",
//               description: "You have cancelled the payment. Your order is still pending.",
//               variant: "destructive",
//             })
//           },
//         },
//       }

//       console.log("Initializing Razorpay with options:", options)

//       // Initialize Razorpay
//       const razorpay = new window.Razorpay(options)
//       razorpay.on("payment.failed", (response: any) => {
//         console.error("Payment failed:", response.error)
//         toast({
//           title: "Payment failed",
//           description: response.error.description || "Your payment has failed. Please try again.",
//           variant: "destructive",
//         })
//         setIsCheckingOut(false)
//       })

//       razorpay.open()
//       console.log("Razorpay checkout opened")
//     } catch (error) {
//       console.error("Razorpay initialization failed:", error)
//       setIsCheckingOut(false)
//       toast({
//         title: "Payment initialization failed",
//         description: "There was an error initializing the payment. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleCheckout = async () => {
//     if (!auth.isAuthenticated) {
//       toast({
//         title: "Login required",
//         description: "Please login to checkout.",
//         variant: "destructive",
//       })
//       router.push("/auth/login")
//       return
//     }

//     if (!validateCheckoutForm()) {
//       return
//     }

//     setIsCheckingOut(true)
//     setError(null)
//     console.log("Starting checkout process...")

//     try {
//       // Create order items from cart
//       const orderItems = cart.items.map((item) => ({
//         medicineId: item.id,
//         quantity: item.quantity,
//       }))

//       console.log("Creating order with items:", orderItems)

//       // Create order
//       const order = await ordersApi.create({
//         items: orderItems,
//         shippingAddress,
//         paymentMethod,
//       })

//       console.log("Order created successfully:", order)

//       // Process payment based on selected method
//       if (paymentMethod === "RAZORPAY" || paymentMethod === "UPI") {
//         console.log("Processing payment with Razorpay")
//         await handleRazorpayPayment(order.id)
//       } else {
//         // For COD or other payment methods
//         console.log("Processing COD payment")
//         clearCart()
//         toast({
//           title: "Order placed successfully",
//           description: "Your order has been placed successfully with Cash on Delivery.",
//         })
//         router.push("/profile")
//       }
//     } catch (error: any) {
//       console.error("Checkout failed:", error)
//       setIsCheckingOut(false)
//       setError(error.message || "There was an error processing your order. Please try again.")
//       toast({
//         title: "Checkout failed",
//         description: error.message || "There was an error processing your order. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const nextStep = () => {
//     if (activeTab === "shipping") {
//       if (!shippingAddress) {
//         toast({
//           title: "Shipping address required",
//           description: "Please enter a shipping address.",
//           variant: "destructive",
//         })
//         return
//       }
//       setActiveTab("payment")
//     }
//   }

//   const prevStep = () => {
//     if (activeTab === "payment") {
//       setActiveTab("shipping")
//     }
//   }

//   if (!mounted) {
//     return null
//   }

//   if (cart.items.length === 0) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-center">
//           <div className="py-12 flex flex-col items-center">
//             <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
//             <p className="text-muted-foreground py-4">Your cart is empty.</p>
//             <Link href="/medicines">
//               <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
//                 Browse Medicines
//               </Button>
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {error && (
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <Card className="border-blue-100 dark:border-blue-900/50">
//         <CardContent className="p-6">
//           <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Your Cart</h2>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Total</TableHead>
//                 <TableHead></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {cart.items.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <div className="flex flex-col">
//                       <Link
//                         href={`/medicines/${item.id}`}
//                         className="font-medium hover:underline text-blue-600 dark:text-blue-400"
//                       >
//                         {item.name}
//                       </Link>
//                       <span className="text-sm text-muted-foreground">{item.brand}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>₹{item.price.toFixed(2)}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         disabled={item.quantity <= 1}
//                       >
//                         <MinusCircle className="h-4 w-4" />
//                       </Button>
//                       <span>{item.quantity}</span>
//                       <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
//                         <PlusCircle className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
//                   <TableCell>
//                     <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
//                       <Trash className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Card className="border-blue-100 dark:border-blue-900/50">
//         <CardContent className="p-6">
//           <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Checkout</h2>

//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-2 mb-6">
//               <TabsTrigger value="shipping">Shipping</TabsTrigger>
//               <TabsTrigger value="payment">Payment</TabsTrigger>
//             </TabsList>

//             <TabsContent value="shipping" className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="shippingAddress" className="text-sm font-medium">
//                   Shipping Address
//                 </Label>
//                 <Textarea
//                   id="shippingAddress"
//                   value={shippingAddress}
//                   onChange={(e) => setShippingAddress(e.target.value)}
//                   placeholder="Enter your complete shipping address"
//                   className="min-h-[100px]"
//                   required
//                 />
//               </div>

//               <div className="flex justify-end mt-4">
//                 <Button
//                   onClick={nextStep}
//                   className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//                 >
//                   Continue to Payment
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="payment" className="space-y-4">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="customerName" className="text-sm font-medium">
//                     Full Name
//                   </Label>
//                   <Input
//                     id="customerName"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="customerEmail" className="text-sm font-medium">
//                     Email
//                   </Label>
//                   <Input
//                     id="customerEmail"
//                     type="email"
//                     value={customerEmail}
//                     onChange={(e) => setCustomerEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="customerPhone" className="text-sm font-medium">
//                     Phone Number
//                   </Label>
//                   <Input
//                     id="customerPhone"
//                     value={customerPhone}
//                     onChange={(e) => setCustomerPhone(e.target.value)}
//                     placeholder="Enter your 10-digit phone number"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="paymentMethod" className="text-sm font-medium">
//                     Payment Method
//                   </Label>
//                   <Select value={paymentMethod} onValueChange={setPaymentMethod}>
//                     <SelectTrigger id="paymentMethod">
//                       <SelectValue placeholder="Select payment method" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="RAZORPAY">Credit/Debit Card (Razorpay)</SelectItem>
//                       <SelectItem value="UPI">UPI (Razorpay)</SelectItem>
//                       <SelectItem value="COD">Cash on Delivery</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="flex justify-between mt-4">
//                 <Button variant="outline" onClick={prevStep}>
//                   Back to Shipping
//                 </Button>
//                 <Button
//                   onClick={handleCheckout}
//                   disabled={isCheckingOut}
//                   className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//                 >
//                   {isCheckingOut ? "Processing..." : "Complete Payment"}
//                 </Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//         <CardFooter className="flex flex-col sm:flex-row justify-between p-6 border-t border-blue-100 dark:border-blue-900/50">
//           <div className="mb-4 sm:mb-0">
//             <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
//               Total: ₹{calculateTotal().toFixed(2)}
//             </p>
//             <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout</p>
//           </div>
//           {activeTab === "shipping" ? (
//             <Button
//               onClick={nextStep}
//               size="lg"
//               className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//             >
//               Continue to Payment
//             </Button>
//           ) : (
//             <Button
//               onClick={handleCheckout}
//               disabled={isCheckingOut}
//               size="lg"
//               className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//             >
//               {isCheckingOut ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <CreditCard className="mr-2 h-5 w-5" />
//                   Complete Payment
//                 </>
//               )}
//             </Button>
//           )}
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }











































"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useCart } from "@/lib/context/cart-context"
import { ordersApi } from "@/lib/api/orders-api"
import { paymentApi } from "@/lib/api/payment-api"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash, MinusCircle, PlusCircle, CreditCard, Loader2, ShoppingBag } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Declare Razorpay as a global variable
declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CartItems() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart()
  const { auth } = useAuth()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [shippingAddress, setShippingAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY")
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [activeTab, setActiveTab] = useState("shipping")
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      console.log("Razorpay already loaded")
      setRazorpayLoaded(true)
    } else {
      // Load Razorpay script
      console.log("Loading Razorpay script")
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => {
        console.log("Razorpay script loaded successfully")
        setRazorpayLoaded(true)
      }
      script.onerror = () => {
        console.error("Failed to load Razorpay script")
        setError("Failed to load payment gateway. Please try again later.")
      }
      document.body.appendChild(script)

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [])

  // Set default values when auth is loaded
  useEffect(() => {
    if (auth.user) {
      setCustomerName(auth.user.username || "")
      setCustomerEmail(auth.user.email || "")
    }
  }, [auth.user])

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const validateCheckoutForm = () => {
    if (!shippingAddress) {
      toast({
        title: "Shipping address required",
        description: "Please enter a shipping address.",
        variant: "destructive",
      })
      return false
    }

    if (!customerName || !customerEmail || !customerPhone) {
      toast({
        title: "Customer information required",
        description: "Please fill in all customer information fields.",
        variant: "destructive",
      })
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return false
    }

    // Basic phone validation (10 digits)
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(customerPhone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleRazorpayPayment = async (orderId: string) => {
    try {
      console.log("Initializing Razorpay payment for order:", orderId)

      if (!window.Razorpay) {
        console.error("Razorpay is not loaded")
        toast({
          title: "Payment Error",
          description: "Payment gateway is not available. Please try again later.",
          variant: "destructive",
        })
        setIsCheckingOut(false)
        return
      }

      // Create Razorpay order
      const orderResponse = await paymentApi.createOrder({
        orderId,
        amount: calculateTotal(),
        currency: "INR",
        receipt: `receipt_${orderId}`,
        notes: "Payment for medicines", // Simple string that will be converted to object in backend
        customerInfo: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
      })

      console.log("Razorpay order created:", orderResponse)

      // Initialize Razorpay options
      const options = {
        key: orderResponse.key,
        amount: orderResponse.amount * 100, // Amount in paise
        currency: orderResponse.currency,
        name: "MediTrack",
        description: "Medicine Purchase",
        order_id: orderResponse.razorpayOrderId,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response: any) => {
          console.log("Payment successful, verifying...", response)
          try {
            // Verify payment
            await paymentApi.verifyPayment({
              orderId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            })

            // Clear cart and show success message
            clearCart()
            toast({
              title: "Payment successful",
              description: "Your order has been placed successfully.",
            })

            // Redirect to profile page
            router.push("/profile")
          } catch (error) {
            console.error("Payment verification failed:", error)
            toast({
              title: "Payment verification failed",
              description: "There was an error verifying your payment. Please contact support.",
              variant: "destructive",
            })
            setIsCheckingOut(false)
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment modal dismissed")
            setIsCheckingOut(false)
            toast({
              title: "Payment cancelled",
              description: "You have cancelled the payment. Your order is still pending.",
              variant: "destructive",
            })
          },
        },
      }

      console.log("Initializing Razorpay with options:", options)

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options)
      razorpay.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error)
        toast({
          title: "Payment failed",
          description: response.error.description || "Your payment has failed. Please try again.",
          variant: "destructive",
        })
        setIsCheckingOut(false)
      })

      razorpay.open()
      console.log("Razorpay checkout opened")
    } catch (error) {
      console.error("Razorpay initialization failed:", error)
      setIsCheckingOut(false)
      toast({
        title: "Payment initialization failed",
        description: "There was an error initializing the payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = async () => {
    if (!auth.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to checkout.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    if (!validateCheckoutForm()) {
      return
    }

    setIsCheckingOut(true)
    setError(null)
    console.log("Starting checkout process...")

    try {
      // Create order items from cart
      const orderItems = cart.items.map((item) => ({
        medicineId: item.id,
        quantity: item.quantity,
      }))

      console.log("Creating order with items:", orderItems)

      // Create order
      const order = await ordersApi.create({
        items: orderItems,
        shippingAddress,
        paymentMethod,
      })

      console.log("Order created successfully:", order)

      // Process payment based on selected method
      if (paymentMethod === "RAZORPAY" || paymentMethod === "UPI") {
        console.log("Processing payment with Razorpay")
        await handleRazorpayPayment(order.id)
      } else {
        // For COD or other payment methods
        console.log("Processing COD payment")
        clearCart()
        toast({
          title: "Order placed successfully",
          description: "Your order has been placed successfully with Cash on Delivery.",
        })
        router.push("/profile")
      }
    } catch (error: any) {
      console.error("Checkout failed:", error)
      setIsCheckingOut(false)
      setError(error.message || "There was an error processing your order. Please try again.")
      toast({
        title: "Checkout failed",
        description: error.message || "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    }
  }

  const nextStep = () => {
    if (activeTab === "shipping") {
      if (!shippingAddress) {
        toast({
          title: "Shipping address required",
          description: "Please enter a shipping address.",
          variant: "destructive",
        })
        return
      }
      setActiveTab("payment")
    }
  }

  const prevStep = () => {
    if (activeTab === "payment") {
      setActiveTab("shipping")
    }
  }

  if (!mounted) {
    return null
  }

  if (cart.items.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="py-12 flex flex-col items-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground py-4">Your cart is empty.</p>
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
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-blue-100 dark:border-blue-900/50">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Your Cart</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <Link
                        href={`/medicines/${item.id}`}
                        className="font-medium hover:underline text-blue-600 dark:text-blue-400"
                      >
                        {item.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">{item.brand}</span>
                    </div>
                  </TableCell>
                  <TableCell>₹{item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-blue-100 dark:border-blue-900/50">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Checkout</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="shipping" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shippingAddress" className="text-sm font-medium">
                  Shipping Address
                </Label>
                <Textarea
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your complete shipping address"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Continue to Payment
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter your 10-digit phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="text-sm font-medium">
                    Payment Method
                  </Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RAZORPAY">Credit/Debit Card (Razorpay)</SelectItem>
                      <SelectItem value="UPI">UPI (Razorpay)</SelectItem>
                      <SelectItem value="COD">Cash on Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={prevStep}>
                  Back to Shipping
                </Button>
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {isCheckingOut ? "Processing..." : "Complete Payment"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between p-6 border-t border-blue-100 dark:border-blue-900/50">
          <div className="mb-4 sm:mb-0">
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
              Total: ₹{calculateTotal().toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout</p>
          </div>
          {activeTab === "shipping" ? (
            <Button
              onClick={nextStep}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Continue to Payment
            </Button>
          ) : (
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Complete Payment
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

