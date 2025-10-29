"use client";

import { useRouter, useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import FXForm from "@/components/form/FXForm";
import { Button } from "@/components/ui/button";
import { useGetMyAdmissions } from "@/hooks/admission.hook";
import { useEditAdmission } from "@/hooks/admission.hook";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import FXInput from "@/components/form/FXInput";
import FXTextArea from "@/components/form/FXTextArea";

export default function EditAdmissionPage() {
  const router = useRouter();
  const params = useParams();
  const admissionId = params.id;

  const { data, isLoading, error } = useGetMyAdmissions();
  const editAdmissionHook = useEditAdmission();

  const [latestAdmission, setLatestAdmission] = useState<any>(null);

  useEffect(() => {
    const setAdmission = async () => {
      if (data?.data?.length) {
        const admission = data.data.find((a: any) => a._id === admissionId);
        setLatestAdmission(admission);
      }
    };
    setAdmission();
  }, [data, admissionId]);

  if (isLoading || !latestAdmission)
    return (
      <Container>
        <p className="text-center py-20 text-gray-500">Loading...</p>
      </Container>
    );

  if (error)
    return (
      <Container>
        <p className="text-center py-20 text-red-500">
          Failed to load admission data
        </p>
      </Container>
    );

  const handleSubmit = async (formData: any) => {
    try {
      await editAdmissionHook.mutateAsync({
        id: admissionId,
        data: formData,
      });
      toast.success("Admission updated successfully!");
      router.push("/profile"); // Redirect back after edit
    } catch (err: any) {
      toast.error(err.message || "Failed to update admission");
    }
  };

  return (
    <Container>
      <div className="py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Edit Admission
        </h1>

        <FXForm
          defaultValues={{
            candidateName: latestAdmission.candidateName,
            candidateEmail: latestAdmission.candidateEmail,
            candidatePhone: latestAdmission.candidatePhone,
            dateOfBirth: latestAdmission.dateOfBirth,
            address: latestAdmission.address,
          }}
          onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <FXInput
              name="candidateName"
              label="Name"
              placeholder="Enter your name"
            />
            <FXInput
              name="candidateEmail"
              label="Email"
              placeholder="Enter your email"
            />
            <FXInput
              name="candidatePhone"
              label="Phone"
              placeholder="Enter your phone number"
            />
            <FXInput
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
            />
            <FXTextArea
              name="address"
              label="Address"
              placeholder="Enter your address"
            />
          </div>

          <Button
            type="submit"
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white">
            Update Admission
          </Button>
        </FXForm>
      </div>
    </Container>
  );
}
