import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Evently - reset password",
  description: "Reset your password in Evently",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const { status } = searchParams;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full  md:max-w-3xl">
        {status && status === "success" ? (
          <div className="flex flex-col gap-2 items-center justify-center  bg-white rounded-md mt-1 py-6">
            <CheckCircle2 size={80} className="text-green-500" />
            <p className="text-xl text-center sm:text-start sm:text-3xl font-semibold">
              Password reset successful
            </p>
            <p className="text-xs text-center sm:text-sm  ">
              Check your email to reset your password
            </p>
          </div>
        ) : (
          <ResetPasswordForm />
        )}
      </div>
    </div>
  );
}
