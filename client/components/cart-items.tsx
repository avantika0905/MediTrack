"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useCart } from "@/lib/context/cart-context"
import { ordersApi } from "@/lib/api/orders-api"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash, MinusCircle, PlusCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function CartItems() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart()
  const { auth } = useAuth()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [shippingAddress, setShippingAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Credit Card")

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
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

    if (!shippingAddress) {
      toast({
        title: "Shipping address required",
        description: "Please enter a shipping address.",
        variant: "destructive",
      })
      return
    }

    setIsCheckingOut(true)

    try {
      // Create order items from cart
      const orderItems = cart.items.map((item) => ({
        medicineId: item.id,
        quantity: item.quantity,
      }))

      // Create order
      await ordersApi.create({
        items: orderItems,
        shippingAddress,
        paymentMethod,
      })

      // Clear the cart
      clearCart()

      toast({
        title: "Order placed successfully",
        description: "Your order has been placed successfully.",
      })

      // Redirect to profile page to see order history
      router.push("/profile")
    } catch (error) {
      console.error("Checkout failed:", error)
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (!mounted) {
    return null
  }

  if (cart.items.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground py-8">Your cart is empty.</p>
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
                    <Link href={`/medicines/${item.id}`} className="font-medium hover:underline text-primary">
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

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Shipping Address</label>
            <Input
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your shipping address"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Method</label>
            <select
              className="w-full p-2 border rounded-md"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between p-6 border-t">
        <div className="mb-4 sm:mb-0">
          <p className="text-lg font-semibold">Total: ₹{calculateTotal().toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout</p>
        </div>
        <Button size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
          {isCheckingOut ? "Processing..." : "Checkout"}
        </Button>
      </CardFooter>
    </Card>
  )
}

