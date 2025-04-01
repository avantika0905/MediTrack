import { Suspense } from "react"
import MedicinesList from "@/components/medicines-list"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Medicines | MediTrack",
  description: "Browse our wide range of medicines and health products",
}

export default function MedicinesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold">All Medicines</h1>
        <p className="text-muted-foreground">Browse our wide range of medicines and health products</p>
      </div>

      <Suspense fallback={<MedicinesListSkeleton />}>
        <MedicinesList />
      </Suspense>
    </div>
  )
}

function MedicinesListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
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

