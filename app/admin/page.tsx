"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  BookOpen,
  FolderOpen,
  Star,
  LogOut,
  Check,
  X,
  Trash2,
  Plus,
  Edit,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  useAdminMessages,
  useMarkAsRead,
  useAdminProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useAdminTestimonials,
  useSendInvite,
  useUpdateTestimonialStatus,
  useDeleteTestimonial,
  useLogout,
  useMe,
} from "@/lib/queries/admin";
import { useGuestbook } from "@/lib/queries/guestbook";
import { useAdminDeleteGuestbook } from "@/lib/queries/admin";

type Tab = "messages" | "guestbook" | "projects" | "testimonials";

// ─── Project Form ─────────────────────────────────────────────────────────────
interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  techStack: string;
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured: boolean;
  order: number;
}

const emptyProject: ProjectFormData = {
  title: "",
  description: "",
  longDescription: "",
  techStack: "",
  liveUrl: "",
  githubUrl: "",
  image: "",
  featured: false,
  order: 0,
};

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("messages");
  const [projectModal, setProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectFormData>(emptyProject);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "" });

  const { data: meData } = useMe();
  const isAuth = !!meData?.success;

  // Queries
  const { data: messagesData } = useAdminMessages(isAuth);
  const { data: guestbookData } = useGuestbook();
  const { data: projectsData } = useAdminProjects(isAuth);
  const { data: testimonialsData } = useAdminTestimonials(isAuth);

  // Mutations
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: deleteGuestbook } = useAdminDeleteGuestbook();
  const { mutate: createProject, isPending: creatingProject } =
    useCreateProject();
  const { mutate: updateProject, isPending: updatingProject } =
    useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();
  const {
    mutate: sendInvite,
    isPending: sendingInvite,
    isSuccess: inviteSent,
    reset: resetInvite,
  } = useSendInvite();
  const { mutate: updateStatus } = useUpdateTestimonialStatus();
  const { mutate: deleteTestimonial } = useDeleteTestimonial();
  const { mutate: logout } = useLogout();

  const messages = messagesData?.data ?? [];
  const guestbook = guestbookData?.data ?? [];
  const projects = projectsData?.data ?? [];
  const testimonials = testimonialsData?.data ?? [];

  const unread = messages.filter((m: any) => !m.read).length;

  const handleLogout = () => {
    logout(undefined, { onSuccess: () => router.push("/admin/login") });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...projectForm,
      techStack: projectForm.techStack
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean),
    };
    if (editingProject) {
      updateProject(
        { id: editingProject, data },
        {
          onSuccess: () => {
            setProjectModal(false);
            setEditingProject(null);
            setProjectForm(emptyProject);
          },
        }
      );
    } else {
      createProject(data, {
        onSuccess: () => {
          setProjectModal(false);
          setProjectForm(emptyProject);
        },
      });
    }
  };

  const openEditProject = (project: any) => {
    setEditingProject(project._id);
    setProjectForm({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription ?? "",
      techStack: project.techStack?.join(", ") ?? "",
      liveUrl: project.liveUrl ?? "",
      githubUrl: project.githubUrl ?? "",
      image: project.image ?? "",
      featured: project.featured,
      order: project.order,
    });
    setProjectModal(true);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    sendInvite(inviteForm, {
      onSuccess: () => {
        setInviteForm({ name: "", email: "" });
        setTimeout(() => resetInvite(), 3000);
      },
    });
  };

  const tabs = [
    { id: "messages", label: "Messages", icon: Mail, count: unread },
    {
      id: "guestbook",
      label: "Guestbook",
      icon: BookOpen,
      count: guestbook.length,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
      count: projects.length,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: Star,
      count: testimonials.filter((t: any) => t.status === "pending").length,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-foreground/40 text-sm mt-1">
            Manage your portfolio content
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-foreground/50 hover:text-foreground hover:border-foreground/30 transition-all text-sm cursor-pointer"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as Tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              tab === t.id
                ? "bg-foreground text-background"
                : "border border-border text-foreground/50 hover:text-foreground"
            }`}
          >
            <t.icon size={14} />
            {t.label}
            {t.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  tab === t.id
                    ? "bg-background/20 text-background"
                    : "bg-foreground/10 text-foreground/60"
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Messages Tab ── */}
      {tab === "messages" && (
        <div className="flex flex-col gap-3">
          {messages.length === 0 ? (
            <p className="text-foreground/30 text-sm text-center py-12">
              No messages yet
            </p>
          ) : (
            messages.map((msg: any) => (
              <div
                key={msg._id}
                className={`p-5 rounded-2xl border transition-all ${
                  msg.read
                    ? "border-border bg-card/30"
                    : "border-foreground/20 bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">
                        {msg.name}
                      </p>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                      <p className="text-xs text-foreground/30">{msg.email}</p>
                    </div>
                    <p className="text-sm text-foreground/60 mb-2">
                      {msg.message}
                    </p>
                    <p className="text-xs text-foreground/30">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {!msg.read && (
                    <button
                      onClick={() => markAsRead(msg._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Eye size={12} /> Mark read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Guestbook Tab ── */}
      {tab === "guestbook" && (
        <div className="flex flex-col gap-3">
          {guestbook.length === 0 ? (
            <p className="text-foreground/30 text-sm text-center py-12">
              No guestbook entries yet
            </p>
          ) : (
            guestbook.map((entry: any) => (
              <div
                key={entry._id}
                className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card/30"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {entry.name}
                  </p>
                  <p className="text-sm text-foreground/60 mt-0.5">
                    {entry.message}
                  </p>
                  <p className="text-xs text-foreground/30 mt-1">
                    {new Date(entry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => deleteGuestbook(entry._id)}
                  className="p-2 rounded-xl text-foreground/30 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Projects Tab ── */}
      {tab === "projects" && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setEditingProject(null);
                setProjectForm(emptyProject);
                setProjectModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Plus size={14} /> Add Project
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {projects.length === 0 ? (
              <p className="text-foreground/30 text-sm text-center py-12">
                No projects yet
              </p>
            ) : (
              projects.map((project: any) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card/30"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">
                        {project.title}
                      </p>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/50 line-clamp-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.techStack?.slice(0, 4).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/40 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => openEditProject(project)}
                      className="p-2 rounded-xl text-foreground/30 hover:text-foreground hover:bg-foreground/10 transition-all cursor-pointer"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="p-2 rounded-xl text-foreground/30 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── Testimonials Tab ── */}
      {tab === "testimonials" && (
        <div>
          {/* Invite form */}
          <form
            onSubmit={handleSendInvite}
            className="flex flex-col sm:flex-row gap-3 p-5 rounded-2xl border border-dashed border-border mb-6"
          >
            <input
              type="text"
              required
              value={inviteForm.name}
              onChange={(e) =>
                setInviteForm({ ...inviteForm, name: e.target.value })
              }
              placeholder="Their name"
              className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
            />
            <input
              type="email"
              required
              value={inviteForm.email}
              onChange={(e) =>
                setInviteForm({ ...inviteForm, email: e.target.value })
              }
              placeholder="Their email"
              className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
            />
            <button
              type="submit"
              disabled={sendingInvite || inviteSent}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              <Send size={13} />
              {sendingInvite
                ? "Sending..."
                : inviteSent
                ? "Sent! 🎉"
                : "Send Invite"}
            </button>
          </form>

          {/* Testimonials list */}
          <div className="flex flex-col gap-3">
            {testimonials.length === 0 ? (
              <p className="text-foreground/30 text-sm text-center py-12">
                No testimonials yet
              </p>
            ) : (
              testimonials.map((t: any) => (
                <div
                  key={t._id}
                  className="p-5 rounded-2xl border border-border bg-card/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">
                          {t.name}
                        </p>
                        <p className="text-xs text-foreground/40">{t.email}</p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            t.status === "approved"
                              ? "bg-green-500/10 text-green-500"
                              : t.status === "rejected"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>
                      {t.message ? (
                        <>
                          <p className="text-xs text-foreground/40 mb-1">
                            {t.role} at {t.company}
                          </p>
                          <p className="text-sm text-foreground/60">
                            {t.message}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-foreground/30 italic">
                          Invite sent — waiting for response
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {t.status === "pending" && t.message && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus({ id: t._id, status: "approved" })
                            }
                            className="p-2 rounded-xl text-foreground/30 hover:text-green-500 hover:bg-green-500/10 transition-all cursor-pointer"
                          >
                            <Check size={15} />
                          </button>
                          <button
                            onClick={() =>
                              updateStatus({ id: t._id, status: "rejected" })
                            }
                            className="p-2 rounded-xl text-foreground/30 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                          >
                            <X size={15} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteTestimonial(t._id)}
                        className="p-2 rounded-xl text-foreground/30 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {projectModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProjectModal(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto"
            >
              <div className="bg-card border border-border rounded-2xl p-6 max-h-[85vh] overflow-y-auto">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  {editingProject ? "Edit Project" : "Add Project"}
                </h2>
                <form
                  onSubmit={handleProjectSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    required
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, title: e.target.value })
                    }
                    placeholder="Title"
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                  <textarea
                    required
                    rows={2}
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Short description"
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                  />
                  <textarea
                    rows={3}
                    value={projectForm.longDescription}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        longDescription: e.target.value,
                      })
                    }
                    placeholder="Long description (optional)"
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                  />
                  <input
                    value={projectForm.techStack}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        techStack: e.target.value,
                      })
                    }
                    placeholder="Tech stack (comma separated: React, Node.js, MongoDB)"
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={projectForm.liveUrl}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          liveUrl: e.target.value,
                        })
                      }
                      placeholder="Live URL"
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                    <input
                      value={projectForm.githubUrl}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          githubUrl: e.target.value,
                        })
                      }
                      placeholder="GitHub URL"
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                  </div>
                  <input
                    value={projectForm.image}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, image: e.target.value })
                    }
                    placeholder="Image URL (optional)"
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={projectForm.order}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          order: Number(e.target.value),
                        })
                      }
                      placeholder="Order"
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                    <label className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-background cursor-pointer">
                      <input
                        type="checkbox"
                        checked={projectForm.featured}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            featured: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <span className="text-sm text-foreground/60">
                        Featured
                      </span>
                    </label>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setProjectModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-border text-foreground/50 text-sm hover:text-foreground transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creatingProject || updatingProject}
                      className="flex-1 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
                    >
                      {creatingProject || updatingProject
                        ? "Saving..."
                        : editingProject
                        ? "Update"
                        : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
