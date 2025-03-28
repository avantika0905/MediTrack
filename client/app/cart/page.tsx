import type { Metadata } from "next"
import CartItems from "@/components/cart-items"

export const metadata: Metadata = {
  title: "Cart | MediMart",
  description: "View and manage your shopping cart",
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <CartItems />
    </div>
  )
}

