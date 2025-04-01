import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Truck, Clock, HeartPulse } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | MediTrack",
  description: "Learn more about MediTrack and our mission",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About MediTrack</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At MediTrack, our mission is to make healthcare accessible to everyone. We believe that everyone deserves
                access to quality medicines at affordable prices, delivered right to their doorstep.
              </p>
              <p className="text-muted-foreground">
                Founded in 2023, MediTrack has quickly grown to become one of the leading online pharmacies, serving
                thousands of customers across the country.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Genuine Medicines</h3>
                </div>
                <p className="text-muted-foreground">
                  We source all our medicines directly from authorized distributors and manufacturers, ensuring that you
                  receive only genuine products.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Fast Delivery</h3>
                </div>
                <p className="text-muted-foreground">
                  We understand the urgency of medical needs. That's why we strive to deliver your medicines within 24
                  hours of placing an order.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">24/7 Support</h3>
                </div>
                <p className="text-muted-foreground">
                  Our customer support team is available round the clock to assist you with any queries or concerns you
                  may have.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <HeartPulse className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Health First</h3>
                </div>
                <p className="text-muted-foreground">
                  We prioritize your health above everything else. Our team of pharmacists ensures that all medicines
                  are stored and handled properly.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground mb-4">
                MediTrack is powered by a team of dedicated professionals, including pharmacists, logistics experts, and
                customer support specialists, all working together to provide you with the best service possible.
              </p>
              <p className="text-muted-foreground">
                Our team is led by experienced healthcare professionals who understand the importance of timely and
                accurate medication delivery.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

