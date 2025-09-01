import { createClient } from "next-sanity";

// Konfigurasi ini HANYA untuk digunakan di sisi server
// Ia memiliki akses penuh ke environment variable rahasia (token)

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2023-05-03";


export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
    
});