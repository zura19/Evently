"use client";
import FormInput from "../FormComps/FormInput";
import FormButton from "../FormComps/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { newPasswordSchema } from "@/lib/types/zod";
import { newPasswordAction } from "@/actions/authActions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function NewPasswordForm({ resetToken }: { resetToken: string }) {
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm<
    z.infer<typeof newPasswordSchema>
  >({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof newPasswordSchema>) {
    console.log(data);

    const newPassword = await newPasswordAction({
      password: data.password,
      repeatPassword: data.repeatPassword,
      resetToken: resetToken,
    });

    if (newPassword.error) {
      toast({
        title: "Error",
        description: newPassword.error as string,
        variant: "destructive",
      });
      return;
    }

    if (newPassword.success) {
      toast({
        title: "Success",
        description: newPassword.success as string,
        variant: "success",
      });
      router.push(`/login`);
      return;
    }
  }

  return (
    <form
      className="border border-border p-4 rounded-md max-w-xl w-full space-y-4 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        type="password"
        className="rounded-md "
        label="Password"
        register={register("password")}
        placeholder="new Password"
        errorMessage={formState.errors.password?.message}
      />
      <FormInput
        type="password"
        className="rounded-md"
        label="Repeat Password"
        register={register("repeatPassword")}
        placeholder="Repeat Password"
        errorMessage={formState.errors.repeatPassword?.message}
      />
      <FormButton
        content="Submit"
        glow={true}
        buttonClassName="rounded-md"
        isSubmitting={formState.isSubmitting}
      />
    </form>
  );
}
