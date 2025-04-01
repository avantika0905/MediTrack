 
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/context/auth-context"
import { CartProvider } from "@/lib/context/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MediTrack - Your Online Pharmacy",
  description: "Get your medicines delivered at your doorstep",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add Razorpay script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <footer className="py-8 border-t border-blue-100 dark:border-blue-900/50 bg-white dark:bg-background">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                      <div>
                        <h3 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-400">MediTrack</h3>
                        <p className="text-gray-600 dark:text-muted-foreground text-sm">
                          Your trusted online pharmacy for all your healthcare needs.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold mb-4 text-blue-700 dark:text-blue-400">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <a
                              href="/"
                              className="text-gray-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              Home
                            </a>
                          </li>
                          <li>
                            <a
                              href="/medicines"
                              className="text-gray-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              Medicines
                            </a>
                          </li>
                          <li>
                            <a
                              href="/about"
                              className="text-gray-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              About Us
                            </a>
                          </li>
                          <li>
                            <a
                              href="/contact"
                              className="text-gray-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              Contact
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold mb-4 text-blue-700 dark:text-blue-400">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <a
                              href="#"
                              className="text-gray-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              FAQs
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-gray-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              Shipping Policy
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-gray-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              Return Policy
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-gray-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              Privacy Policy
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold mb-4 text-blue-700 dark:text-blue-400">Contact Us</h3>
                        <address className="not-italic text-sm text-gray-600 dark:text-muted-foreground">
                          <p>123 Health Street</p>
                          <p>Medical District, City</p>
                          <p className="mt-2">Email: support@MediTrack.com</p>
                          <p>Phone: +1 (123) 456-7890</p>
                        </address>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-blue-100 dark:border-blue-900/50 text-center text-sm text-gray-600 dark:text-muted-foreground">
                      © {new Date().getFullYear()} MediTrack. All rights reserved.
                    </div>
                  </div>
                </footer>
              </div>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

