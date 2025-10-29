"use client";

import FXForm from "@/components/form/FXForm";
import { useCreateAdmission } from "@/hooks/admission.hook";
import { useGetColleges } from "@/hooks/college.hook";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import FXSelect from "@/components/form/FXSelect";
import FXDatePicker from "@/components/form/FXDatePicker";
import FXTextArea from "@/components/form/FXTextArea";

export default function AdmissionPage() {
  const { data: colleges } = useGetColleges();
  const { mutateAsync: createAdmission, isPending } = useCreateAdmission();
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      // Debug form data
      console.log("Form data:", data);

      Object.keys(data).forEach((key) => {
        if (key === "image" && data.image?.[0]) {
          formData.append("image", data.image[0]);
        } else if (key === "collegeId" && data.collegeId) {
          // Ensure collegeId is a string
          if (Array.isArray(data.collegeId)) {
            console.error("collegeId is an array:", data.collegeId);
            formData.append("collegeId", data.collegeId[0]);
          } else {
            formData.append("collegeId", data.collegeId);
          }
        } else if (key === "dateOfBirth" && data.dateOfBirth) {
          // Convert dateOfBirth to YYYY-MM-DD
          const dob = new Date(data.dateOfBirth);
          if (!isNaN(dob.getTime())) {
            formData.append("dateOfBirth", dob.toISOString().split("T")[0]);
          } else {
            console.error("Invalid dateOfBirth:", data.dateOfBirth);
            throw new Error("Invalid Date of Birth format");
          }
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      await createAdmission(formData);
      toast.success("Admission submitted successfully!");
      setPreview(null);
      //   redirect to my-colleges page
      window.location.href = "/my-colleges";
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to submit admission";
      toast.error(errorMessage);
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-10 pt-24 px-4">
      <h1 className="text-3xl font-semibold text-center text-purple-700 mb-8">
        College Admission Form
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <FXForm onSubmit={handleSubmit}>
          <AdmissionFormFields
            colleges={colleges?.data || []}
            preview={preview}
            setPreview={setPreview}
            isPending={isPending}
          />
        </FXForm>
      </div>
    </div>
  );
}

function AdmissionFormFields({
  colleges,
  preview,
  setPreview,
  isPending,
}: {
  colleges: any[];
  preview: string | null;
  setPreview: (url: string | null) => void;
  isPending: boolean;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* College & Subject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="collegeId"
          control={control}
          rules={{ required: "College selection is required" }}
          render={({ field: { value, onChange, ...field } }) => (
            <FXSelect
              {...field}
              name="collegeId"
              label="Select College"
              options={colleges.map((college: any) => ({
                key: college._id, // Use 'key' instead of 'value' to match FXSelect
                label: college.collegeName,
              }))}
              value={value || ""} // Ensure value is a string
              onValueChange={(val: string) => {
                console.log("Selected collegeId:", val); // Debug
                onChange(val);
              }}
              required
            />
          )}
        />

        <Controller
          name="subject"
          control={control}
          rules={{ required: "Subject selection is required" }}
          render={({ field: { value, onChange, ...field } }) => (
            <FXSelect
              {...field}
              name="subject"
              label="Select Subject"
              options={[
                { key: "Computer Science", label: "Computer Science" },
                { key: "Business Studies", label: "Business Studies" },
                {
                  key: "Mechanical Engineering",
                  label: "Mechanical Engineering",
                },
                { key: "Medical", label: "Medical" },
              ]}
              value={value || ""} // Ensure value is a string
              onValueChange={(val: string) => {
                console.log("Selected subject:", val); // Debug
                onChange(val);
              }}
              required
            />
          )}
        />
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            {...register("candidateName", {
              required: "Candidate Name is required",
            })}
            placeholder="Candidate Name"
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.candidateName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.candidateName.message as string}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("candidateEmail", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            type="email"
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.candidateEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.candidateEmail.message as string}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("candidatePhone", {
              required: "Phone Number is required",
            })}
            placeholder="Phone Number"
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.candidatePhone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.candidatePhone.message as string}
            </p>
          )}
        </div>
        <div>
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{ required: "Date of Birth is required" }}
            render={({ field }) => (
              <FXDatePicker
                {...field}
                label="Date of Birth"
                onChange={(date: any) => {
                  console.log("Selected date:", date); // Debug
                  field.onChange(date);
                }}
              />
            )}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateOfBirth.message as string}
            </p>
          )}
        </div>
      </div>

      <div>
        <FXTextArea
          name="address"
          label="Address"
          rules={{ required: "Address is required" }}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address.message as string}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "Profile Image is required" })}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="border p-2 rounded-md w-full cursor-pointer"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">
            {errors.image.message as string}
          </p>
        )}
        {preview && (
          <div className="mt-3 flex justify-center">
            <Image
              src={preview}
              alt="Preview"
              width={120}
              height={120}
              className="rounded-lg border object-cover"
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition duration-300">
        {isPending ? "Submitting..." : "Submit Admission"}
      </button>
    </div>
  );
}
