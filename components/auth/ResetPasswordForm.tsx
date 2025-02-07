"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import FormInput from "../FormComps/FormInput";
import FormButton from "../FormComps/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetSchema } from "@/lib/types/zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { resetPasswordAction } from "@/actions/authActions";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm<
    z.infer<typeof resetSchema>
  >({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resetSchema>) {
    const resetToken = await resetPasswordAction(data);

    if (resetToken.error) {
      toast({
        title: "Error",
        description: resetToken.error as string,
        variant: "destructive",
      });
      return;
    }

    if (resetToken.success) {
      toast({
        title: "Success",
        description: resetToken.success as string,
        variant: "success",
      });
      router.push(`/resetPassword?status=success`);
      return;
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="overflow-hidden ">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col w-full items-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-sm text-balance  text-muted-foreground">
                  You will get a link to reset your password
                </p>
              </div>

              <FormInput
                register={register("email")}
                errorMessage={formState.errors.email?.message}
                label="Email"
                className="bg-background rounded-md"
                placeholder="m@example.com"
              />

              <FormButton
                glow={true}
                isSubmitting={formState.isSubmitting}
                content="Continue"
              ></FormButton>
            </div>

            <div>
              <Button variant={"link"} asChild className="p-0 mt-4">
                <Link href="/login" className="text-sm flex items-center">
                  <ArrowLeft />
                  <span>Back to login</span>
                </Link>
              </Button>
            </div>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="./placeholder.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
