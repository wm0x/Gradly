"use client";
import React, { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ComboboxDropdownMenu } from "@/components/ui/combobox-project";
import { signOut } from "next-auth/react";
import { format, formatDistanceToNow } from "date-fns";
import { Session } from "next-auth";
import EditProfile from "@/components/ui/edit-profile";
import { toast } from "sonner"
import { deleteProject } from "@/app/api/action/project/deleteProject";
import { useRouter } from "next/navigation";
type Props = {
  session: Session | null;
};

type Project = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
};

export default function DashboardProfile({ session }: Props) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  async function handleDelete() {
    if (!session?.user.id) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/user/account/delete?id=${session.user.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        await signOut({ callbackUrl: "/" }); // logout and redirect
        toast("You will delete your account", {
          description: (
            <span className="text-green-400">
              {format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a")}
            </span>
          ),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account", error);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  }

  function handleDeleteProject(projectId: string) {
    startTransition(async () => {
      const { error } = await deleteProject(projectId);
      if (error) {
        alert(error);
      } else {
        router.refresh();
      }
    });
  }
  

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/user/projects/${session?.user.id}`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();

        const transformed = data.map((proj: any) => ({
          id: proj.id,
          title: proj.title,
          status: proj.status,
          createdAt: proj.createdAt || new Date().toISOString(),
        }));

        setProjects(transformed);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user.id) {
      fetchProjects();
    }
  }, [session?.user.id]);

  return (
    <div className="bg-[#0e0e0e] p-4 md:p-8 w-full min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 pb-4 border-b border-white/10">
        <div className="mb-4 md:mb-0">
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            <span className="">Profile Settings</span>
          </h1>
          <p className="text-white/60 text-sm mt-1">
            Manage your account information and preferences
          </p>
        </div>
        <div className="text-white/50 text-xs md:text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1d1d1d] p-6 rounded-xl border border-white/5 shadow-lg shadow-black/20 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={`https://avatar.vercel.sh/${session?.user.name}`}
                alt="User Avatar"
                className="h-20 w-20 rounded-full border-2 border-emerald-500/30 object-cover"
              />
              <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-[#1a1a1a]"></div>
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">
                {session?.user.name}
              </h2>
              <p className="text-emerald-400 text-sm">
                @{session?.user?.username}
              </p>
              <p className="text-white/60 text-sm mt-1">
                Member since{" "}
                {session?.user?.createdAt
                  ? new Date(session.user.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        day: "2-digit",
                        year: "numeric",
                        month: "long",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto">
            <EditProfile
              session={{
                user: {
                  name: session?.user.name ?? "",
                  email: session?.user.email ?? "",
                  username: session?.user.username ?? "",
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1d1d1d] p-6 rounded-xl border border-white/5 shadow-lg shadow-black/20 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-lg font-semibold">
            My Projects
            <span className="ml-2 text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">
              {3} Projects
            </span>
          </h3>
        </div>

        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-white">No projects found.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      project.status === "completed"
                        ? "bg-emerald-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <span className="text-white font-medium">
                    {project.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/60 text-sm">
                    Created At:{" "}
                    {formatDistanceToNow(new Date(project.createdAt), {
                      addSuffix: true,
                    })}
                  </span>{" "}
                  <div className="text-white/50 hover:text-white transition-colors">
                    <ComboboxDropdownMenu onDelete={() => handleDeleteProject(project.id)} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1d1d1d] p-6 rounded-xl border border-red-500/20 shadow-lg ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-red-500 text-lg font-semibold mb-1">
              Delete Account
            </h3>
            <p className="text-white/70">
              Permanently remove your account and all associated data.
              <span className="block text-red-700/70 text-sm mt-1">
                This action cannot be undone.
              </span>
            </p>
          </div>
          <Button
            variant="destructive"
            className="bg-red-600/90 hover:bg-red-700/90 transition-colors"
            onClick={() => setOpenDialog(true)}
          >
            <span className="text-white text-sm font-medium">
              Delete Account
            </span>
          </Button>
        </div>
      </div>

      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 w-full ">
          <div className="bg-gray-900 p-6 rounded-md max-w-sm w-full text-white bg-zinc-950">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete your account?
            </h3>
            <p className="mb-6 text-sm text-gray-300">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                disabled={loading}
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-white/5 text-center pb-5">
        <p className="text-white/50 text-xs">
          Profile updated at {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
