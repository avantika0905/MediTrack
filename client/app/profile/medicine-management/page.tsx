import type { Metadata } from "next";
import MedicineManagementForm from "@/components/medicine-management-form";
import UserMedicines from "@/components/user-medicines";

export const metadata: Metadata = {
  title: "Medicine Management | MediMart",
  description: "Manage your medicines in MediMart",
};

export default function MedicineManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Medicine Management</h1>

      <div className="grid gap-8 md:grid-cols-1">
        <div>
          <h2 className="text-2xl font-bold mb-6">Add New Medicine</h2>
          <MedicineManagementForm />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Medicines</h2>
          <UserMedicines />
        </div>
      </div>
    </div>
  );
}
