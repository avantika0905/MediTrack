import type { Metadata } from "next"
import ProfileInfo from "@/components/profile-info"
import OrderHistory from "@/components/order-history"

export const metadata: Metadata = {
  title: "Profile | MediMart",
  description: "View and manage your MediMart profile",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div>
          <ProfileInfo />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Order History</h2>
          <OrderHistory />
        </div>
      </div>
    </div>
  )
}

