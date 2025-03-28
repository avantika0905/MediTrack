// // "use client"

// // import { useEffect, useState } from "react"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// // import { Button } from "@/components/ui/button"
// // import { useRouter } from "next/navigation"
// // import { toast } from "@/components/ui/use-toast"
// // import { useAuth } from "@/lib/context/auth-context"

// // export default function ProfileInfo() {
// //   const { auth, logout } = useAuth()
// //   const router = useRouter()
// //   const [mounted, setMounted] = useState(false)

// //   // Prevent hydration mismatch
// //   useEffect(() => {
// //     setMounted(true)
// //   }, [])

// //   useEffect(() => {
// //     // Redirect to login if not authenticated
// //     if (mounted && !auth.isAuthenticated) {
// //       router.push("/auth/login")
// //     }
// //   }, [auth.isAuthenticated, router, mounted])

// //   const handleLogout = () => {
// //     logout()

// //     toast({
// //       title: "Logged out",
// //       description: "You have been logged out successfully.",
// //     })

// //     router.push("/")
// //   }

// //   if (!mounted || !auth.isAuthenticated) {
// //     return null
// //   }

// //   return (
// //     <Card>
// //       <CardHeader className="pb-2">
// //         <CardTitle>Profile Information</CardTitle>
// //       </CardHeader>
// //       <CardContent className="space-y-6">
// //         <div className="flex flex-col items-center space-y-4">
// //           <Avatar className="h-24 w-24">
// //             <AvatarFallback className="text-2xl">{auth.user?.username.charAt(0).toUpperCase()}</AvatarFallback>
// //           </Avatar>
// //           <div className="text-center">
// //             <h3 className="text-xl font-medium">{auth.user?.username}</h3>
// //             <p className="text-sm text-muted-foreground">
// //               {auth.user?.roles.includes("ADMIN") ? "Administrator" : "Customer"}
// //             </p>
// //           </div>
// //         </div>

// //         <div className="space-y-2">
// //           <div className="flex justify-between">
// //             <span className="text-sm text-muted-foreground">Username</span>
// //             <span className="text-sm font-medium">{auth.user?.username}</span>
// //           </div>
// //           <div className="flex justify-between">
// //             <span className="text-sm text-muted-foreground">User ID</span>
// //             <span className="text-sm font-medium">{auth.user?.id}</span>
// //           </div>
// //           <div className="flex justify-between">
// //             <span className="text-sm text-muted-foreground">Role</span>
// //             <span className="text-sm font-medium">{auth.user?.roles.join(", ")}</span>
// //           </div>
// //         </div>

// //         <Button variant="destructive" className="w-full" onClick={handleLogout}>
// //           Logout
// //         </Button>
// //       </CardContent>
// //     </Card>
// //   )
// // }































// // client/components/profile-info.tsx
// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation"
// import { toast } from "@/components/ui/use-toast"
// import { useAuth } from "@/lib/context/auth-context"

// export default function ProfileInfo() {
//   const { auth, logout } = useAuth()
//   const router = useRouter()
//   const [mounted, setMounted] = useState(false)

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   useEffect(() => {
//     // Redirect to login if not authenticated
//     if (mounted && !auth.isAuthenticated) {
//       router.push("/auth/login")
//     }
//   }, [auth.isAuthenticated, router, mounted])

//   const handleLogout = () => {
//     logout()
//     toast({
//       title: "Logged out",
//       description: "You have been logged out successfully.",
//     })
//     router.push("/")
//   }

//   if (!mounted || !auth.isAuthenticated) {
//     return null
//   }

//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <CardTitle>Profile Information</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="flex flex-col items-center space-y-4">
//           <Avatar className="h-24 w-24">
//             <AvatarFallback className="text-2xl">
//               {auth.user?.username.charAt(0).toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//           <div className="text-center">
//             <h3 className="text-xl font-medium">{auth.user?.username}</h3>
//             <p className="text-sm text-muted-foreground">
//               {auth.user?.roles?.includes("ADMIN") ? "Administrator" : "Customer"}
//             </p>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <div className="flex justify-between">
//             <span className="text-sm text-muted-foreground">Username</span>
//             <span className="text-sm font-medium">{auth.user?.username}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-sm text-muted-foreground">User ID</span>
//             <span className="text-sm font-medium">{auth.user?.id}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-sm text-muted-foreground">Role</span>
//             <span className="text-sm font-medium">
//               {auth.user?.roles?.join(", ")}
//             </span>
//           </div>
//         </div>

//         <Button variant="destructive" className="w-full" onClick={handleLogout}>
//           Logout
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }





























"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/context/auth-context"
import Link from "next/link"

export default function ProfileInfo() {
  const { auth, logout } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Redirect to login if not authenticated
    if (mounted && !auth.isAuthenticated) {
      router.push("/auth/login")
    }
  }, [auth.isAuthenticated, router, mounted])

  const handleLogout = () => {
    logout()

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })

    router.push("/")
  }

  if (!mounted || !auth.isAuthenticated) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-2xl">{auth.user?.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-medium">{auth.user?.username}</h3>
            <p className="text-sm text-muted-foreground">{auth.user?.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Username</span>
            <span className="text-sm font-medium">{auth.user?.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">{auth.user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">User ID</span>
            <span className="text-sm font-medium">{auth.user?.id}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Link href="/profile/medicine-management">
            <Button className="w-full" variant="outline">
              Manage Medicines
            </Button>
          </Link>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

