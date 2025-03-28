import type { Medicine } from "../api/medicines-api"
import type { Order } from "../api/orders-api"

export const getSampleMedicines = (): Medicine[] => {
  return [
    {
      id: "sample1",
      name: "Paracetamol",
      brand: "XYZ Pharma",
      price: 50.0,
      stock: 100,
      description: "Effective pain reliever and fever reducer",
      category: "Pain Relief",
    },
    {
      id: "sample2",
      name: "Ibuprofen",
      brand: "ABC Health",
      price: 80.0,
      stock: 200,
      description: "Anti-inflammatory medication for pain and swelling",
      category: "Pain Relief",
    },
    {
      id: "sample3",
      name: "Aspirin",
      brand: "MediCare",
      price: 120.5,
      stock: 300,
      description: "Blood thinner and pain reliever",
      category: "Cardiovascular",
    },
    {
      id: "sample4",
      name: "Cetirizine",
      brand: "HealthPlus",
      price: 65.0,
      stock: 150,
      description: "Antihistamine for allergy relief",
      category: "Allergy",
    },
    {
      id: "sample5",
      name: "Omeprazole",
      brand: "DigestCare",
      price: 95.0,
      stock: 120,
      description: "Reduces stomach acid production",
      category: "Digestive Health",
    },
    {
      id: "sample6",
      name: "Amoxicillin",
      brand: "BactaShield",
      price: 150.0,
      stock: 80,
      description: "Antibiotic for bacterial infections",
      category: "Antibiotics",
    },
    {
      id: "sample7",
      name: "Loratadine",
      brand: "AllerFree",
      price: 75.0,
      stock: 180,
      description: "Non-drowsy antihistamine for allergies",
      category: "Allergy",
    },
    {
      id: "sample8",
      name: "Metformin",
      brand: "GlucoBalance",
      price: 110.0,
      stock: 90,
      description: "Oral medication for type 2 diabetes",
      category: "Diabetes",
    },
  ]
}

export const getSampleMedicineById = (id: string): Medicine => {
  const sampleMedicines = [
    {
      id: "sample1",
      name: "Paracetamol",
      brand: "XYZ Pharma",
      price: 50.0,
      stock: 100,
      description:
        "Paracetamol is a medication used to treat fever and mild to moderate pain. It's often sold in combination with other medications, such as in cold medications. At normal doses, paracetamol is generally safe for use, but overdose can lead to liver damage.",
      category: "Pain Relief",
    },
    {
      id: "sample2",
      name: "Ibuprofen",
      brand: "ABC Health",
      price: 80.0,
      stock: 200,
      description:
        "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used for relieving pain, helping with fever, and reducing inflammation. It works by inhibiting the production of prostaglandins, chemicals in the body that cause pain and inflammation.",
      category: "Pain Relief",
    },
    {
      id: "sample3",
      name: "Aspirin",
      brand: "MediCare",
      price: 120.5,
      stock: 300,
      description:
        "Aspirin is a medication used to reduce pain, fever, or inflammation. It is also used as a blood thinner to prevent heart attacks and strokes in high-risk patients. Aspirin works by blocking the production of certain natural substances that cause inflammation.",
      category: "Cardiovascular",
    },
    {
      id: "sample4",
      name: "Cetirizine",
      brand: "HealthPlus",
      price: 65.0,
      stock: 150,
      description:
        "Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching. It works by blocking a certain natural substance (histamine) that your body makes during an allergic reaction.",
      category: "Allergy",
    },
  ]

  return sampleMedicines.find((med) => med.id === id) || sampleMedicines[0]
}

export const getSampleOrders = (): Order[] => {
  return [
    {
      id: "order1",
      userId: "user123",
      medicineId: "sample1",
      quantity: 2,
      orderDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    },
    {
      id: "order2",
      userId: "user123",
      medicineId: "sample2",
      quantity: 1,
      orderDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    },
    {
      id: "order3",
      userId: "user123",
      medicineId: "sample3",
      quantity: 3,
      orderDate: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    },
  ]
}

