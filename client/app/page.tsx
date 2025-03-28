import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react"
import FeaturedMedicines from "@/components/featured-medicines"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Your Health, Our Priority
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Get your medicines delivered at your doorstep. Fast, reliable, and secure.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/medicines">
                  <Button size="lg" className="gap-1">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/sommmmn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1743166406/pschns0vevksfevnvgy0.jpg"
                alt="MediMart Hero"
                className="mx-auto   overflow-hidden rounded-xl object-cover object-center"
                width={600}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose MediMart?</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                We provide the best service for all your pharmaceutical needs.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 border">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Genuine Medicines</h3>
              <p className="text-center text-muted-foreground">
                All our medicines are sourced from authorized distributors.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 border">
              <div className="bg-primary/10 p-3 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-center text-muted-foreground">
                Get your medicines delivered within 24 hours.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 border">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-center text-muted-foreground">
                Our customer support team is available round the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Medicines</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                Explore our top-selling medicines and health products.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <FeaturedMedicines />
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/medicines">
              <Button size="lg" variant="outline">
                View All Medicines
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
