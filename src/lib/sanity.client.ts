import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2023-05-03";

// Ambil token dari environment variable publik
export const token = process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  token: token,   
});