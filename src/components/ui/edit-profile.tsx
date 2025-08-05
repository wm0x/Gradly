"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 

interface Props {
  session: {
    user: {
      name?: string | null;
      email: string;
      username: string;
    };
  };
}

import { FaRegEdit } from "react-icons/fa";

export default function EditProfile({ session }: Props) {
    const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: session.user.name || "",
    username: session.user.username || "",
    email: session.user.email || "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/user/account/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setIsOpen(false);
      router.refresh();
    } else {
      console.log("Error with edit account info ")
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transport border hover:bg-zinc-700 text-white w-full">
          Edit Profile
          <FaRegEdit />
        </Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />

      <DialogContent className="fixed z-50 top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
        <DialogTitle className="text-lg font-semibold mb-4">
          Edit Profile
        </DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
