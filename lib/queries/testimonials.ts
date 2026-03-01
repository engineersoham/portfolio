import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/testimonials`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });