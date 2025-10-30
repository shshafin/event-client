import { useUser } from "@/context/user.provider";
import { useUpdateUser } from "@/hooks/auth.hook";
import { useState } from "react";

export default function EditProfilePage() {
  const { user, setUser } = useUser();
  const updateUserMutation = useUpdateUser();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = async () => {
    if (!user) return;
    try {
      const updatedUser = await updateUserMutation.mutateAsync({
        id: user.id,
        userData: { username, email },
      });
      setUser(updatedUser); // ✅ UI auto refresh
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        placeholder="Email"
      />

      <button
        onClick={handleUpdate}
        className="bg-rose-700 text-white px-6 py-2 rounded hover:bg-rose-800">
        Update Profile
      </button>
    </div>
  );
}
