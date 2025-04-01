// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react"
// import FeaturedMedicines from "@/components/featured-medicines"

// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section */}
//       <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-primary/5">
//         <div className="container mx-auto px-6">
//           <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
//             <div className="flex flex-col justify-center space-y-4">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
//                   Your Health, Our Priority
//                 </h1>
//                 <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                   Get your medicines delivered at your doorstep. Fast, reliable, and secure.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Link href="/medicines">
//                   <Button size="lg" className="gap-1">
//                     Shop Now <ArrowRight className="h-4 w-4" />
//                   </Button>
//                 </Link>
//                 <Link href="/about">
//                   <Button size="lg" variant="outline">
//                     Learn More
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//             <div className="flex items-center justify-center">
//               <img
//                 src="https://res.cloudinary.com/sommmmn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1743166406/pschns0vevksfevnvgy0.jpg"
//                 alt="MediTrack Hero"
//                 className="mx-auto   overflow-hidden rounded-xl object-cover object-center"
//                 width={600}
//                 height={500}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-12 md:py-24 lg:py-32 bg-background">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose MediTrack?</h2>
//               <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
//                 We provide the best service for all your pharmaceutical needs.
//               </p>
//             </div>
//           </div>
//           <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
//             <div className="flex flex-col items-center space-y-2 rounded-lg p-4 border">
//               <div className="bg-primary/10 p-3 rounded-full">
//                 <ShieldCheck className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="text-xl font-bold">Genuine Medicines</h3>
//               <p className="text-center text-muted-foreground">
//                 All our medicines are sourced from authorized distributors.
//               </p>
//             </div>
//             <div className="flex flex-col items-center space-y-2 rounded-lg p-4 border">
//               <div className="bg-primary/10 p-3 rounded-full">
//                 <Truck className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="text-xl font-bold">Fast Delivery</h3>
//               <p className="text-center text-muted-foreground">
//                 Get your medicines delivered within 24 hours.
//               </p>
//             </div>
//             <div className="flex flex-col items-center space-y-2 rounded-lg p-4 border">
//               <div className="bg-primary/10 p-3 rounded-full">
//                 <Clock className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="text-xl font-bold">24/7 Support</h3>
//               <p className="text-center text-muted-foreground">
//                 Our customer support team is available round the clock.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Medicines */}
//       <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Medicines</h2>
//               <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
//                 Explore our top-selling medicines and health products.
//               </p>
//             </div>
//           </div>
//           <div className="mt-12">
//             <FeaturedMedicines />
//           </div>
//           <div className="flex justify-center mt-8">
//             <Link href="/medicines">
//               <Button size="lg" variant="outline">
//                 View All Medicines
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }





































import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Truck, Clock, HeartPulse, Star, Users, Award, Sparkles } from "lucide-react"
import FeaturedMedicines from "@/components/featured-medicines"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-primary/10 dark:to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                  #1 Online Pharmacy
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-700 dark:text-blue-400">
                  Your Health, Our Priority
                </h1>
                <p className="max-w-[600px] text-gray-600 dark:text-muted-foreground md:text-xl">
                  Get your medicines delivered at your doorstep. Fast, reliable, and secure with MediTrack.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/medicines">
                  <Button
                    size="lg"
                    className="gap-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/7852720/pexels-photo-7852720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="MediTrack Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white dark:bg-background border-y border-gray-100 dark:border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-3 dark:bg-blue-900/20">
                <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium">Free Delivery</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-3 dark:bg-blue-900/20">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium">Genuine Medicines</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-3 dark:bg-blue-900/20">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium">24/7 Support</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-3 dark:bg-blue-900/20">
                <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium">Top Rated</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                Our Services
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700 dark:text-blue-400">
                Why Choose MediTrack?
              </h2>
              <p className="max-w-[700px] text-gray-600 dark:text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide the best service for all your pharmaceutical needs.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-6 border border-blue-100 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-900/30">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">Genuine Medicines</h3>
              <p className="text-center text-gray-600 dark:text-muted-foreground">
                All our medicines are sourced from authorized distributors.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-6 border border-blue-100 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-900/30">
                <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">Fast Delivery</h3>
              <p className="text-center text-gray-600 dark:text-muted-foreground">
                Get your medicines delivered within 24 hours.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-6 border border-blue-100 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-900/30">
                <HeartPulse className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">Health First</h3>
              <p className="text-center text-gray-600 dark:text-muted-foreground">
                Our customer support team is available round the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-primary/10 dark:to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                Testimonials
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700 dark:text-blue-400">
                What Our Customers Say
              </h2>
              <p className="max-w-[700px] text-gray-600 dark:text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. See what our customers have to say.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
            <div className="flex flex-col space-y-4 rounded-lg p-6 bg-white dark:bg-gray-950 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Rahul Sharma</h4>
                  <p className="text-sm text-gray-500">Delhi</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-gray-600 dark:text-muted-foreground">
                "I've been using MediTrack for the past 6 months and I'm extremely satisfied with their service. The
                medicines are delivered on time and the prices are reasonable."
              </p>
            </div>
            <div className="flex flex-col space-y-4 rounded-lg p-6 bg-white dark:bg-gray-950 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Priya Patel</h4>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-gray-600 dark:text-muted-foreground">
                "The customer service is exceptional. I had an issue with my order and they resolved it immediately. The
                app is also very user-friendly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-12 md:py-24 lg:py-32 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                Featured Products
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700 dark:text-blue-400">
                Featured Medicines
              </h2>
              <p className="max-w-[700px] text-gray-600 dark:text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our top-selling medicines and health products.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <FeaturedMedicines />
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/medicines">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
              >
                View All Medicines
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="mb-2 bg-white/20 text-white hover:bg-white/20">Mobile App</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Download Our Mobile App</h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl">
                  Get exclusive offers and track your orders on the go with our mobile app.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mr-2"
                  >
                    <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
                    <path d="M16 19h6"></path>
                    <path d="M19 16v6"></path>
                  </svg>
                  App Store
                </Button>
                <Button size="lg" variant="secondary" className="gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mr-2"
                  >
                    <path d="m12 3-1.9 6.3L3.7 11l6.4 1.8L12 19l1.9-6.3L20.3 11l-6.4-1.8Z"></path>
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-30 blur-xl"></div>
                <img
                  src="https://res.cloudinary.com/sommmmn/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1743312754/image_16_if7umu.jpg"
                  alt="MediTrack Mobile App"
                  className="relative mx-auto h-[500px] w-[250px] rounded-3xl object-cover object-center shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-12 md:py-16 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                Recognition
              </Badge>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-blue-700 dark:text-blue-400">
                Awards & Recognition
              </h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-50 p-4 rounded-full dark:bg-blue-900/20">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-center">Best Online Pharmacy 2023</h3>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-50 p-4 rounded-full dark:bg-blue-900/20">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-center">1M+ Happy Customers</h3>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-50 p-4 rounded-full dark:bg-blue-900/20">
                <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-center">Excellence in Service</h3>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-50 p-4 rounded-full dark:bg-blue-900/20">
                <HeartPulse className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-center">Healthcare Innovation</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-900/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700 dark:text-blue-400">
                Ready to Experience the Best Pharmacy Service?
              </h2>
              <p className="max-w-[600px] text-gray-600 dark:text-muted-foreground md:text-xl">
                Join thousands of satisfied customers who trust MediTrack for their healthcare needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/medicines">
                <Button
                  size="lg"
                  className="gap-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

