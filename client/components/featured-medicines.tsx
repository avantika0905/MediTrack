 

"use client";

import { useEffect, useState } from "react";
import type { Medicine } from "@/lib/api/medicines-api";
import { medicinesApi } from "@/lib/api/medicines-api";
import MedicineCard from "@/components/medicine-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSampleMedicines } from "@/lib/utils/sample-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await medicinesApi.getAll();
        setMedicines(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Add some sample medicines if the API doesn't return any
  const displayMedicines =
    medicines.length > 0 ? medicines : getSampleMedicines();

  // Number of cards to display at once based on screen size
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4; // Default for SSR
  };

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    handleResize(); // Set initial value

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= displayMedicines.length
        ? 0
        : prevIndex + visibleCount
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visibleCount < 0
        ? Math.max(0, displayMedicines.length - visibleCount)
        : prevIndex - visibleCount
    );
  };

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
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayMedicines
          .slice(currentIndex, currentIndex + visibleCount)
          .map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
      </div>

      {displayMedicines.length > visibleCount && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
