import { Suspense } from "react"
import { notFound } from "next/navigation"
import MedicineDetails from "@/components/medicine-details"
import RelatedMedicines from "@/components/related-medicines"
import { Skeleton } from "@/components/ui/skeleton"

interface MedicinePageProps {
  params: {
    id: string
  }
}

export default function MedicinePage({ params }: MedicinePageProps) {
  const { id } = params

  if (!id) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<MedicineDetailsSkeleton />}>
        <MedicineDetails id={id} />
      </Suspense>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Medicines</h2>
        <Suspense fallback={<RelatedMedicinesSkeleton />}>
          <RelatedMedicines currentId={id} />
        </Suspense>
      </div>
    </div>
  )
}

function MedicineDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

function RelatedMedicinesSkeleton() {
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

