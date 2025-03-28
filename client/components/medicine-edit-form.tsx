"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { medicinesApi, type Medicine } from "@/lib/api/medicines-api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  stock: z
    .string()
    .refine(
      (val) =>
        !isNaN(Number(val)) &&
        Number(val) >= 0 &&
        Number.isInteger(Number(val)),
      {
        message: "Stock must be a non-negative integer.",
      }
    ),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  image: z.string().optional(),
});

interface MedicineEditFormProps {
  id: string;
}

export default function MedicineEditForm({ id }: MedicineEditFormProps) {
  const router = useRouter();
  const { auth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      stock: "",
      description: "",
      category: "",
      image: "",
    },
  });

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
    const fetchMedicine = async () => {
      if (!auth.isAuthenticated) return;

      try {
        const data = await medicinesApi.getById(id);
        setMedicine(data);

        // Set form values
        form.reset({
          name: data.name,
          brand: data.brand,
          price: data.price.toString(),
          stock: data.stock.toString(),
          description: data.description || "",
          category: data.category || "",
          image: data.image || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch medicine:", error);
        toast({
          title: "Failed to fetch medicine",
          description:
            "There was an error fetching the medicine details. Please try again.",
          variant: "destructive",
        });
        router.push("/profile/medicine-management");
      }
    };

    if (mounted && auth.isAuthenticated) {
      fetchMedicine();
    }
  }, [id, auth.isAuthenticated, form, router, mounted]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth.isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to update medicines.",
        variant: "destructive",
      });
      router.push("/auth/login");
      return;
    }

    setIsSubmitting(true);

    try {
      await medicinesApi.update(id, {
        name: values.name,
        brand: values.brand,
        price: Number(values.price),
        stock: Number(values.stock),
        description: values.description,
        category: values.category,
        image: values.image || undefined,
      });

      toast({
        title: "Medicine updated",
        description: "The medicine has been updated successfully.",
      });

      router.push("/profile/medicine-management");
    } catch (error) {
      console.error("Failed to update medicine:", error);
      toast({
        title: "Failed to update medicine",
        description:
          "There was an error updating the medicine. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicine Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter medicine name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Enter stock quantity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter medicine description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating Medicine..." : "Update Medicine"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/profile/medicine-management")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
