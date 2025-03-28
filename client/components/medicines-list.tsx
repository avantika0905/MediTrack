"use client"

import { useEffect, useState } from "react"
import type { Medicine } from "@/lib/api/medicines-api"
import { medicinesApi } from "@/lib/api/medicines-api"
import MedicineCard from "@/components/medicine-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSampleMedicines } from "@/lib/utils/sample-data"

export default function MedicinesList() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await medicinesApi.getAll()

        // If API returns empty data, use sample data
        const medicinesData = data.length > 0 ? data : getSampleMedicines()

        setMedicines(medicinesData)
        setFilteredMedicines(medicinesData)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch medicines:", error)
        setMedicines(getSampleMedicines())
        setFilteredMedicines(getSampleMedicines())
        setLoading(false)
      }
    }

    fetchMedicines()
  }, [])

  useEffect(() => {
    // Filter and sort medicines when search query or sort option changes
    let result = [...medicines]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(query) ||
          medicine.brand.toLowerCase().includes(query) ||
          (medicine.category && medicine.category.toLowerCase().includes(query)),
      )
    }

    // Sort medicines
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

    setFilteredMedicines(result)
  }, [medicines, searchQuery, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredMedicines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No medicines found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  )
}

