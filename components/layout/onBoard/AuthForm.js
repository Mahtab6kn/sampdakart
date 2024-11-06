import { usePathname } from "next/navigation";

import SigninForm from "./login/SigninForm";
import SignupForm from "./login/SignupForm";

import ForgetPasswordForm from "./forgotPassword/ForgetPasswordForm";
import ResetPasswordForm from "./forgotPassword/ResetPasswordForm";

const AuthForm = ({ isAnimated, setIsAnimated }) => {
  const path = usePathname();

  return (
    <>
      <div
        id="signin"
        className={`bg-white absolute top-0 left-0 h-full w-full lg:w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20 ${
          isAnimated ? "lg:translate-x-full opacity-0" : ""
        }`}
      >
        {path === "/login" ? (
          <SigninForm isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
        ) : (
          <ForgetPasswordForm
            isAnimated={isAnimated}
            setIsAnimated={setIsAnimated}
          />
        )}
      </div>

      <div
        id="signup"
        className={`absolute top-0 left-0 h-full w-full lg:w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out ${
          isAnimated
            ? "lg:translate-x-full opacity-100 z-50 animate-show"
            : "opacity-0 z-10"
        }`}
      >
        <div className="h-full w-full flex justify-center items-center">
          {path === "/login" ? (
            <SignupForm isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
          ) : (
            <ResetPasswordForm
              isAnimated={isAnimated}
              setIsAnimated={setIsAnimated}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
