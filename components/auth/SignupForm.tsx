"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import FormInput from "../FormComps/FormInput";
import FormButton from "../FormComps/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/lib/types/zod";
import { signUpAction } from "@/actions/authActions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm<
    z.infer<typeof signUpSchema>
  >({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    console.log(data);

    const user = await signUpAction(data);

    if (user.error) {
      toast({
        title: "Error",
        description: user.error as string,
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Success",
      description: "Account created successfully",
    });
    router.push("/login");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Signup to Evently
                </p>
              </div>
              <FormInput
                register={register("username")}
                errorMessage={formState.errors.username?.message}
                type="text"
                label="Username"
                className="bg-background rounded-md"
                placeholder="johndoe"
              />

              <FormInput
                register={register("email")}
                errorMessage={formState.errors.email?.message}
                label="Email"
                className="bg-background rounded-md"
                placeholder="m@example.com"
              />

              <FormInput
                register={register("password")}
                errorMessage={formState.errors.password?.message}
                type="password"
                label="Password"
                className="bg-background rounded-md"
              />
              <FormButton
                isSubmitting={formState.isSubmitting}
                content="SignUp"
              ></FormButton>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
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
