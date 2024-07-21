"use client";
import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting login form with:", { email, password });

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response from sign-in API:", data);

      if (response.ok) {
        const token = data.token;
        setCookie("token", token);
        localStorage.setItem("token", token);
        console.log("Token set in cookies:", token);

        const userDetailsResponse = await fetch("/api/auth/user-details", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const userDetailsData = await userDetailsResponse.json();

        if (userDetailsResponse.ok) {
          const { username } = userDetailsData.user;
          login(data.token, { username, email });
          setLoading(false);
          console.log("Redirecting to services page");
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
      console.error("An error occurred:", error);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl md:w-1/3 lg:w-1/4">
      <p className="text-center font-bold text-green-500 lg:text-xl">
        Ifrane<span className="text-black">X.</span>
      </p>
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("welcome_message")}
      </h2>

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
            className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
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
      <div className="flex items-center justify-between">
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

      <div className="mt-4 text-center">
        {errorMessage && (
          <p className="text-sm text-red-500">{t("error_message_login")}</p>
        )}
      </div>
    </div>
  );
};
