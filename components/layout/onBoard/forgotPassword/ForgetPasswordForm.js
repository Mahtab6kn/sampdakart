"use client";

import { Input } from "@material-tailwind/react";

import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import OnboardBtn from "@/components/ui/buttons/OnboardBtn";

const ForgotPasswordForm = ({ isAnimated, setIsAnimated }) => {
  const [otp, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [timer, setTimer] = useState(60);

  const [showOTP, setShowOTP] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleNumberChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    value = value.replace(/^0+/, "");

    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value.length <= 6) {
      setOTP(value);
    }
  };

  const getOtp = async () => {
    try {
      if (!phoneNumber) {
        toast.error("Please enter your phone number");
        return;
      }

      if (phoneNumber.length < 10) {
        toast.error("Please enter a valid phone number");
        return;
      }

      setIsLoading(true);

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/number/${phoneNumber}`
      );

      const data = await userResponse.json();

      if (!userResponse.ok) {
        setIsLoading(false);
        toast.error(data);

        return;
      }

      setUser(data);

      const otpPromise = new Promise(async (resolve, reject) => {
        try {
          const otpResponse = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/generate-otp/${data.toString()}`,
            {
              method: "GET",
            }
          );

          if (!otpResponse.ok) {
            reject(`Error generating OTP.`);
          }

          const otpData = await otpResponse.json();

          const sendOtpResponse = await fetch(
            `https://api.authkey.io/request?authkey=ea048f1e37474761&mobile=${phoneNumber}&country_code=91&sid=8732&company=GhostingTech&otp=${otpData}`
          );

          if (!sendOtpResponse.ok) {
            reject(`Error sending OTP.`);
          }

          setIsOtpSent(true);
          setTimer(60);

          resolve(otpData);
        } catch (error) {
          reject(error);
        }
      });

      toast.promise(otpPromise, {
        loading: "Sending OTP...",

        success: () => {
          setIsLoading(false);
          setShowOTP(true);

          return "OTP sent successfully";
        },

        error: (error) => {
          setIsLoading(false);

          return `Error sending OTP: ${error.message || error}`;
        },
      });
    } catch (error) {
      setIsLoading(false);

      toast.error(`Something went wrong`);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!otp) {
        toast.error("Please enter the OTP");
        return;
      }

      if (otp.length < 6) {
        toast.error("Please enter a valid OTP");
        return;
      }

      setIsLoading(true);

      const url = `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/generate-otp/${user.toString()}`;

      const promiseFunction = () =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ otp }),
            });

            const data = await response.json();

            if (!response.ok) {
              reject(`${data}`);
              setIsLoading(false);

              return;
            }

            localStorage.setItem("reset-token", JSON.stringify(data));

            setIsAnimated((prev) => !prev);

            resolve(data);
          } catch (error) {
            reject(error);
          }
        });

      toast.promise(promiseFunction(), {
        loading: "Verifying OTP...",

        success: () => {
          setIsLoading(false);

          setOTP("");
          setPhoneNumber("");

          return "OTP verified successfully";
        },

        error: (error) => {
          setIsLoading(false);

          return `Error verifying OTP: ${error.message || error}`;
        },
      });
    } catch (error) {
      setIsLoading(false);

      toast.error(`Something went wrong`);
    }
  };

  return (
    <div className="lg:w-3/4 w-11/12 max-w-md">
      <div className="flex flex-col justify-center items-center w-full space-y-10">
        <h1 className="text-4xl font-bold text-pink-500">Forgot Password?</h1>

        <div className="mt-8 w-full">
          <div className="space-y-8">
            <Input
              type="number"
              size="regular"
              variant="standard"
              label="Your Number"
              placeholder="Number"
              required
              name="forgot-number"
              value={phoneNumber}
              onChange={handleNumberChange}
              error={phoneNumber && phoneNumber.length < 10}
            />

            {showOTP && (
              <Input
                type="number"
                size="regular"
                variant="standard"
                label="OTP"
                placeholder="OTP"
                required
                name="forgot-otp"
                value={otp}
                onChange={handleOtpChange}
                error={otp && otp.length < 6}
              />
            )}
          </div>

          {showOTP && (
            <div className="flex mt-2 justify-end text-sm gap-1">
              <p>Didn&apos;t received OTP?</p>
              {timer === 0 ? (
                <button
                  type="button"
                  className="cursor-pointer underline text-red-500 disabled:cursor-default disabled:opacity-50"
                  onClick={getOtp}
                  disabled={timer === 0 && !isOtpSent}
                >
                  Resend OTP
                </button>
              ) : (
                <p>
                  Resend in
                  <span className="text-red-500">
                    {" "}
                    {String(timer).padStart(2, "0")}s
                  </span>
                </p>
              )}
            </div>
          )}

          {showOTP ? (
            <OnboardBtn
              type="button"
              label="Verify OTP"
              onClick={verifyOtp}
              isLoading={isLoading}
            />
          ) : (
            <OnboardBtn
              type="button"
              label="Get OTP"
              onClick={getOtp}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      <div className="flex gap-1 items-center mt-4 text-sm justify-center">
        <div>Remember your password?</div>

        <Link
          className=" text-blue-600 hover:underline focus:outline-none font-medium underline hover:scale-105 transition-transform"
          href="/login"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
