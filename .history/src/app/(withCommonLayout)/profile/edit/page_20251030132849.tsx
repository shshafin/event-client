"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/context/user.provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateUser } from "@/hooks/auth.hook";

// ✅ Validation Schema
const updateUserSchema = z.object({
  username: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  image: z.any().optional(),
});

type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

export default function EditProfilePage() {
  const { user, setUser } = useUser(); // ✅ get setUser for auto update
  const { mutateAsync, isPending } = useUpdateUser();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: UpdateUserFormValues) => {
    if (!user) return;

    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      // ✅ Update user
      const updatedUser = await mutateAsync({
        id: user._id,
        userData: formData,
      });

      // ✅ Update context to refresh UI
      setUser(updatedUser);

      toast.success("Profile updated successfully!");
      reset();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update profile");
      toast.error(err.message || "Failed to update profile");
    }
  };

  return (
    <section className="h-130"></section>
  );
}
