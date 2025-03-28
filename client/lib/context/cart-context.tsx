"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

interface CartContextType {
  cart: CartState
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ items: [] })

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...prevCart,
          items: prevCart.items.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem,
          ),
        }
      } else {
        // Add new item
        return {
          ...prevCart,
          items: [...prevCart.items, { ...item, quantity }],
        }
      }
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    }))
  }

  const removeItem = (id: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.id !== id),
    }))
  }

  const clearCart = () => {
    setCart({ items: [] })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

