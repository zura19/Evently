"use client";
import { Iuser } from "@/lib/types/userTypes";
import FormInput from "../FormComps/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/lib/types/zod";
import { z } from "zod";
import FormButton from "../FormComps/FormButton";
import { FormSelect } from "../FormComps/FormSelect";
import { updateUserAction } from "@/actions/userModel";
import { toast } from "@/hooks/use-toast";

export default function EditProfileForm({
  user,
  closeModal,
  isLoggedUserAdmin,
}: {
  user: Iuser;
  closeModal: () => void;
  isLoggedUserAdmin: boolean;
}) {
  const { register, formState, handleSubmit, setValue } = useForm<
    z.infer<typeof editProfileSchema>
  >({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      role: user.role || "user",
    },
  });

  async function onSubmit(data: z.infer<typeof editProfileSchema>) {
    const updatedUser = await updateUserAction(user._id, data);

    if (updatedUser.error) {
      toast({
        title: "Error",
        description: updatedUser.error as string,
        variant: "destructive",
      });
      return;
    }

    if (updatedUser.success) {
      toast({
        title: "Success",
        description: updatedUser.success as string,
        variant: "success",
      });
      closeModal();
      return;
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        errorMessage={formState.errors.username?.message}
        register={{ ...register("username") }}
        label="Username"
        placeholder="Enter your username"
      />

      <FormInput
        register={{ ...register("email") }}
        label="Email"
        placeholder="Enter your email"
      />

      {(isLoggedUserAdmin || user.role === "admin") && (
        <FormSelect
          value={user.role}
          arr={[
            { label: "User", value: "user" },
            { label: "Moderator", value: "moderator" },
            { label: "Admin", value: "admin" },
          ]}
          placeholder={user.role}
          label="Role"
          name="role"
          errorMessage={formState.errors.role?.message}
          setValue={setValue}
        />
      )}

      <FormButton
        glow={true}
        content="Save"
        isSubmitting={formState.isSubmitting}
      />
    </form>
  );
}
