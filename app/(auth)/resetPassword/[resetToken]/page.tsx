import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import Timer from "@/components/Timer";
import { Button } from "@/components/ui/button";
import User from "@/models/userModel";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Evently - create new password",
  description: "Create new password in Evently",
};

export default async function page({
  params,
}: {
  params: { resetToken: string };
}) {
  const { resetToken } = params;
  const user = await User.findOne({ resetToken });

  if (
    !user ||
    user?.resetToken !== resetToken ||
    user.resetTokenExpiresAt < Date.now()
  ) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-center">
            Something went wrong
          </h1>
          <p className="text-center text-sm font-medium text-red-500">
            token expired or invalid token, please try again
          </p>
          <Button variant={"link"} asChild className="w-full p-0">
            <Link href="/login">
              <ArrowLeft />
              Back to Login page
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col  items-center justify-center ">
      <h1 className="text-3xl font-semibold text-center">Reset Password</h1>

      <div className="flex items-center justify-center text-sm  gap-1">
        <p>token expires in:</p>
        <Timer date={user.resetTokenExpiresAt.toISOString()} />
      </div>

      <UpdatePasswordForm resetToken={resetToken} />
    </div>
  );
}
