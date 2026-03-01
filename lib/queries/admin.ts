import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authFetch = (url: string, options?: RequestInit) => {
  const token = localStorage.getItem("admin_token");
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

// ── Auth ──────────────────────────────────────────────────────────────────────

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: { email: string; password: string; rememberMe: boolean }) => {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const json = await res.json();
      if (json.token) localStorage.setItem("admin_token", json.token);
      return json;
    },
  });

  export const useMe = () =>
    useQuery({
      queryKey: ["me"],
      queryFn: async () => {
        const token = localStorage.getItem("admin_token");
        if (!token) throw new Error("Not authenticated");
        const res = await authFetch(`${API_URL}/api/auth/me`);
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      },
      retry: false,
    });

  export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        localStorage.removeItem("admin_token");
      },
      onSuccess: () => {
        queryClient.clear();
      },
    });
  };

// ── Contact Messages ──────────────────────────────────────────────────────────

export const useAdminMessages = (enabled = true) =>
  useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const res = await authFetch(`${API_URL}/api/contact`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    enabled,
    retry: false,
  });

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await authFetch(`${API_URL}/api/contact/${id}/read`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-messages"] }),
  });
};

// ── Guestbook ─────────────────────────────────────────────────────────────────

export const useAdminDeleteGuestbook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await authFetch(`${API_URL}/api/guestbook/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete entry");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guestbook"] }),
  });
};

// ── Projects ──────────────────────────────────────────────────────────────────

export const useAdminProjects = (enabled = true) =>
  useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const res = await authFetch(`${API_URL}/api/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
    enabled,
    retry: false,
  });

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: object) => {
      const res = await authFetch(`${API_URL}/api/admin/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create project");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-projects"] }),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: object }) => {
      const res = await authFetch(`${API_URL}/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update project");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-projects"] }),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await authFetch(`${API_URL}/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-projects"] }),
  });
};

// ── Testimonials ──────────────────────────────────────────────────────────────

export const useAdminTestimonials = (enabled = true) =>
  useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const res = await authFetch(`${API_URL}/api/admin/testimonials`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
    enabled,
    retry: false,
  });

export const useSendInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const res = await authFetch(`${API_URL}/api/admin/testimonials/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send invite");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });
};

export const useUpdateTestimonialStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "approved" | "rejected" }) => {
      const res = await authFetch(`${API_URL}/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await authFetch(`${API_URL}/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });
};