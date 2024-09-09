"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { setCookie } from "cookies-next";
import { useToast } from "@/contexts/ToastContext";
import { tailspin } from "ldrs";
import OTPModal from "../OTPModal";

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("LoginForm");
  const locale = useLocale();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setErrorMessage(false);

      try {
        const response = await fetch("/api/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const token = data.token;
          console.log(token);

          setCookie("token", token);
          localStorage.setItem("token", token);

          const userDetailsResponse = await fetch("/api/auth/user-details", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userDetailsData = await userDetailsResponse.json();

          if (userDetailsResponse.ok) {
            const { id, username, profilePicture } = userDetailsData.user;
            await login(token, { id, profilePicture, username, email });
            showToast(t("login_success"), "success");
            router.push(`/${locale}/services`);
            setLoading(false);
          } else {
            setLoading(false);
            setErrorMessage(true);
            console.error(
              "Error fetching user details:",
              userDetailsData.message
            );
          }
        } else {
          setLoading(false);
          setErrorMessage(true);
          console.error("Sign-in error:", data.message);
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage(true);
        console.error("An error occurred:", error);
      }
    },
    [email, password, login, router, locale]
  );

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  tailspin.register();

  return (
    <div className="p-8 md:w-1/3 lg:w-1/4 bg-white rounded-xl">
      <div className="flex justify-center mb-4">
        <Image
          src="/app-logo.svg"
          alt="Home logo icon"
          width={40}
          height={40}
          className="cursor-pointer mr-2 object-contain"
          priority
        />
      </div>
      <h2 className="text-xl font-bold text-center">{t("welcome_message")}</h2>
      <div className="mt-4 text-center">
        {errorMessage && (
          <div
            id="alert-border-2"
            className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <p className="ms-3 text-xs lg:text-sm md:text-sm font-medium">
              {t("error_message_login")}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="email"
            className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
              email ||
              document.activeElement === document.getElementById("email")
                ? "text-indigo-600"
                : "text-gray-500"
            }`}
          >
            {t("email")}
          </label>
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            {t("password")}
          </label>
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
          >
            {showPassword ? (
              <Image src="/eye-off.svg" alt="eye-on" width={18} height={18} />
            ) : (
              <Image src="/eye-on.svg" alt="eye-on" width={18} height={18} />
            )}
          </button>
        </div>
        <a
          className="inline-block align-baseline text-sm text-indigo-700 mt-2"
          href={`/${locale}/reset-password`}
        >
          {t("forgot_password")}
        </a>
        <div className="mb-6 mt-4">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <span className="mr-2 mt-1">
                  <l-tailspin
                    size="15"
                    stroke="1"
                    speed="0.6"
                    color="black"
                  ></l-tailspin>
                </span>
                {t("signin_button")}..
              </div>
            ) : (
              t("signin_button")
            )}
          </button>
        </div>
      </form>
      <div className="flex items-center lg:justify-between md:justify-between gap-4">
        <span className="inline-block align-baseline text-sm">
          {t("dont_have")}{" "}
          <a className="text-indigo-700" href={`/${locale}/register`}>
            {t("sign_up")}
          </a>
        </span>
        <div className="text-sm text-indigo-700 underline">
          <OTPModal />
        </div>
      </div>
    </div>
  );
};
