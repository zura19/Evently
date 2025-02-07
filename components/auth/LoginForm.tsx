"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ContinueWith from "./ContinueWith";
import { useForm } from "react-hook-form";
import FormButton from "../FormComps/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/types/zod";
import { z } from "zod";
import { signInAction } from "@/actions/authActions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { formState, register, handleSubmit, reset } = useForm<
    z.infer<typeof loginSchema>
  >({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);
    const user = await signInAction(data);
    if (user?.error) {
      toast({
        title: user.error,
        description:
          user.error === "Invalid credentials"
            ? "Please check your email and password."
            : user.error,
        variant: "destructive",
      });
      return;
    }

    router.push("/");
    toast({
      title: "Success",
      description: "Login successful",
      variant: "success",
    });
    reset();
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
                  Login to your Evently account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/resetPassword"
                    className="ml-auto text-xs underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                />
              </div>
              <FormButton
                glow={true}
                content="Login"
                isSubmitting={formState.isSubmitting}
              />
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <ContinueWith />
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
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
