"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import EditProfileForm from "./EditProfileForm";
import { Iuser } from "@/lib/types/userTypes";
import { useState } from "react";

export default function EditProfileModal({
  user,
  isLoggedUserAdmin,
}: {
  user: Iuser;
  isLoggedUserAdmin: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="ml-auto mb-auto">
        <Button className="">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EditProfileForm
          isLoggedUserAdmin={isLoggedUserAdmin}
          closeModal={closeModal}
          user={user}
        />
      </DialogContent>
    </Dialog>
  );
}
