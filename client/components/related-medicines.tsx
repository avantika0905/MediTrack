"use client"

import { useEffect, useState } from "react"
import type { Medicine } from "@/lib/api/medicines-api"
import { medicinesApi } from "@/lib/api/medicines-api"
import MedicineCard from "@/components/medicine-card"
import { getSampleMedicines } from "@/lib/utils/sample-data"

interface RelatedMedicinesProps {
  currentId: string
}

export default function RelatedMedicines({ currentId }: RelatedMedicinesProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await medicinesApi.getAll()

        // Filter out current medicine and get only 4 related medicines
        const filteredData = data.filter((medicine) => medicine.id !== currentId).slice(0, 4)

        // If API returns empty data, use sample data
        if (filteredData.length > 0) {
          setMedicines(filteredData)
        } else {
          setMedicines(
            getSampleMedicines()
              .filter((m) => m.id !== currentId)
              .slice(0, 4),
          )
        }

        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch related medicines:", error)
        setMedicines(
          getSampleMedicines()
            .filter((m) => m.id !== currentId)
            .slice(0, 4),
        )
        setLoading(false)
      }
    }

    fetchMedicines()
  }, [currentId])

  if (medicines.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {medicines.map((medicine) => (
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  )
}

