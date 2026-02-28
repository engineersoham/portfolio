import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchGuestbook = async () => {
  const res = await fetch(`${API_URL}/api/guestbook`);
  if (!res.ok) throw new Error("Failed to fetch guestbook");
  return res.json();
};

const postGuestbook = async (data: { name: string; message: string }) => {
  const res = await fetch(`${API_URL}/api/guestbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to post message");
  return res.json();
};

export const useGuestbook = () =>
  useQuery({
    queryKey: ["guestbook"],
    queryFn: fetchGuestbook,
  });

export const usePostGuestbook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postGuestbook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guestbook"] });
    },
  });
};