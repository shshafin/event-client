/* eslint-disable @next/next/no-img-element */
"use client";

import Container from "@/components/ui/Container";
import { useGetMyAdmissions } from "@/hooks/admission.hook";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  User,
  Mail,
  Phone,
  Home,
  GraduationCap,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { envConfig } from "@/config/envConfig";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";


export default function MyColleges() {
  const router = useRouter();
  const { user } = useUser();

  return 
}
 