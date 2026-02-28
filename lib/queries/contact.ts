import { useMutation } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const sendContact = async (data: ContactPayload) => {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
};

export const useContact = () =>
  useMutation({
    mutationFn: sendContact,
  });