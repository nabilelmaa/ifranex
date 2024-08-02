"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { setCookie } from "cookies-next";
import Image from "next/image";
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
          console.log("Token received:", token);

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

            setLoading(false);
            router.push(`/${locale}/services`);
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

  return (
    <div className="p-8 rounded-lg md:w-1/3 lg:w-1/4 ">
      <p className="text-center font-bold text-green-500 lg:text-xl">
        Ifrane<span className="text-black">X.</span>
      </p>
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("welcome_message")}
      </h2>

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
            <p className="ms-3 text-sm font-medium">
              {t("error_message_login")}
            </p>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
              data-dismiss-target="#alert-border-2"
              aria-label="Close"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Image
              src="/mail.svg"
              alt="user-icon"
              width={20}
              height={20}
              className="mr-1"
            />
            <label className="block text-gray-700 text-sm ml-1" htmlFor="email">
              {t("email")}
            </label>
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Image
              src="/lock.svg"
              alt="user-icon"
              width={20}
              height={20}
              className="mr-1"
            />
            <label
              className="block text-gray-700 text-sm ml-1"
              htmlFor="passwhref={`/${locale}/sign-in`}ord"
            >
              {t("password")}
            </label>
          </div>

          <div className="relative focus:border-blue-500">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 password-input"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>

          <a
            className="inline-block align-baseline text-sm text-green-500 hover:text-green-600"
            href="#"
          >
            {t("forgot_password")}
          </a>
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6  bg-black focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <span className="loading loading-spinner loading-sm mr-2"></span>
                {t("signin_button")}...
              </div>
            ) : (
              t("signin_button")
            )}
          </button>
        </div>
      </form>
      <div className="flex items-center lg:justify-between md:justify-between gap-4">
        <span className="inline-block align-baseline text-xs lg:text-sm md:text-sm">
          {t("dont_have")}{" "}
          <a
            className="text-green-500 hover:text-green-600"
            href={`/${locale}/register`}
          >
            {t("sign_up")}
          </a>
        </span>
        <div className="text-sm text-green-500 underline">
          <OTPModal />
        </div>
      </div>
    </div>
  );
};
