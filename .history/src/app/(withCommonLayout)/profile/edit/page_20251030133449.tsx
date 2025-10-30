"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/context/user.provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateUser } from "@/hooks/auth.hook";
import { getCurrentUser } from "@/services/AuthService";

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

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UpdateUserFormValues) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await mutateAsync({ id: user?._id, userData: formData });
      const updatedUser = await getCurrentUser();
      setUser(updatedUser); // <--- এখানে
      toast.success("Profile updated successfully!");
      reset();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <section className="h-130">
      <div className="max-w-lg mx-auto mt-24 p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-rose-700 text-center">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              {...register("username")}
              className="w-full border rounded-md p-2"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full border rounded-md p-2"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-rose-700 hover:bg-rose-800 text-white">
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </section>
  );
}
