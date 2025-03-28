import type { Metadata } from "next"
import MedicineEditForm from "@/components/medicine-edit-form"

export const metadata: Metadata = {
  title: "Edit Medicine | MediMart",
  description: "Edit medicine details in MediMart",
}

export default function MedicineEditPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Medicine</h1>
      <MedicineEditForm id={params.id} />
    </div>
  )
}

