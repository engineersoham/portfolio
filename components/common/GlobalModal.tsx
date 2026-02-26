"use client";

import { useContactStore } from "@/lib/store";
import { ContactModal } from "./ContactModal";

export function GlobalModal() {
  const { isContactOpen, closeContact } = useContactStore();
  return <ContactModal isOpen={isContactOpen} onClose={closeContact} />;
}