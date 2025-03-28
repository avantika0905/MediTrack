"use client";

import { useEffect, useState } from "react";
import { medicinesApi, type Medicine } from "@/lib/api/medicines-api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/context/auth-context";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function UserMedicines() {
  const router = useRouter();
  const { auth } = useAuth();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !auth.isAuthenticated) {
      router.push("/auth/login");
    }
  }, [auth.isAuthenticated, router, mounted]);

  useEffect(() => {
    const fetchMedicines = async () => {
      if (!auth.isAuthenticated) return;

      try {
        const data = await medicinesApi.getUserMedicines();
        setMedicines(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
        setLoading(false);
      }
    };

    if (mounted && auth.isAuthenticated) {
      fetchMedicines();
    }
  }, [auth.isAuthenticated, mounted]);

  const handleDelete = async (id: string) => {
    try {
      await medicinesApi.delete(id);
      setMedicines(medicines.filter((medicine) => medicine.id !== id));
      toast({
        title: "Medicine deleted",
        description: "The medicine has been deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete medicine:", error);
      toast({
        title: "Failed to delete medicine",
        description:
          "There was an error deleting the medicine. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  if (!mounted || !auth.isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (medicines.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground py-8">
            You haven&apos;t added any medicines yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {medicines.map((medicine) => (
          <Card key={medicine.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{medicine.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {medicine.brand}
                  </p>
                  <p className="mt-2">₹{medicine.price.toFixed(2)}</p>
                  <p className="text-sm">Stock: {medicine.stock}</p>
                  <p className="text-sm">Category: {medicine.category}</p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/profile/medicine-management/edit/${medicine.id}`}
                  >
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDeleteId(medicine.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              medicine from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
