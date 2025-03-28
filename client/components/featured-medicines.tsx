"use client"

import { useEffect, useState } from "react"
import type { Medicine } from "@/lib/api/medicines-api"
import { medicinesApi } from "@/lib/api/medicines-api"
import MedicineCard from "@/components/medicine-card"
import { Skeleton } from "@/components/ui/skeleton"
import { getSampleMedicines } from "@/lib/utils/sample-data"

export default function FeaturedMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await medicinesApi.getAll()
        // Only show up to 4 medicines on the homepage
        setMedicines(data.slice(0, 4))
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch medicines:", error)
        setLoading(false)
      }
    }

    fetchMedicines()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  // Add some sample medicines if the API doesn't return any
  const displayMedicines = medicines.length > 0 ? medicines : getSampleMedicines().slice(0, 4)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayMedicines.map((medicine) => (
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  )
}

