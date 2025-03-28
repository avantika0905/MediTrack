import { atom } from "recoil"

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

export const cartState = atom<CartState>({
  key: "cartState",
  default: {
    items: [],
  },
})

