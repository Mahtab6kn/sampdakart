"use client";

import { Input } from "@material-tailwind/react";

import { signIn } from "next-auth/react";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OnboardBtn from "@/components/ui/buttons/OnboardBtn";

const ResetPasswordForm = ({ isAnimated, setIsAnimated }) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (password && confirmPassword && password !== confirmPassword) {
        toast.error("Passwords do not match");
      }

      if (password && confirmPassword && password === confirmPassword) {
        toast.success("Passwords matched");
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [password, confirmPassword]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    if (!confirmPassword) {
      toast.error("Please enter your phone number");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (confirmPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem("reset-token");

    const formDataToSend = new FormData();

    formDataToSend.append("token", token);
    formDataToSend.append("password", password);

    let data;

    const promiseFunction = () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password`,
            {
              method: "POST",
              body: formDataToSend,
            }
          );

          data = await response.json();

          if (!response.ok) {
            reject(data);

            return;
          }

          const isSignIn = await signIn("credentials", {
            redirect: false,
            phoneNumber: data.user.phoneNumber,
            password,
          });

          if (!isSignIn.ok) {
            reject("Something went wrong: Cannot Sign In");

            return;
          }

          router.push("/");

          resolve(data);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promiseFunction(), {
      loading: "Resetting Password...",

      success: () => {
        setIsLoading(false);

        setPassword("");
        setConfirmPassword("");

        localStorage.removeItem("reset-token");

        setIsAnimated((prev) => !prev);

        return "Password Reset Successfully";
      },

      error: (error) => {
        setIsLoading(false);

        return `${error.message || error || "Something went wrong"}`;
      },
    });
  };

  return (
    <div className="lg:w-3/4 w-11/12 max-w-md">
      <div className="flex flex-col justify-center items-center w-full space-y-10">
        <h1 className="text-4xl font-bold text-pink-500">
          Reset Your Password!
        </h1>

        <form className="mt-8 w-full" onSubmit={onSubmit} method="POST">
          <div className="space-y-8">
            <Input
              type="password"
              size="regular"
              variant="standard"
              label="Your New Password"
              placeholder="Password"
              required
              name="reset-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={
                password &&
                password.length < 8 &&
                confirmPassword &&
                password !== confirmPassword
              }
            />

            <Input
              type="password"
              size="regular"
              variant="standard"
              label="Confirm Password"
              placeholder="Password"
              required
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={
                confirmPassword &&
                confirmPassword.length < 8 &&
                password &&
                password !== confirmPassword
              }
            />
          </div>

          <OnboardBtn
            type="submit"
            label="Update Password"
            onClick={onSubmit}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
