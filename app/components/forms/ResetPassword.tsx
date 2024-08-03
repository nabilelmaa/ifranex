"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";

export const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [formState, setFormState] = useState<"email" | "verification">("email");
  const router = useRouter();
  const t = useTranslations("RegisterForm");
  const locale = useLocale();
  const { showToast } = useToast();
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verificationCode = `${one}${two}${three}${four}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isCodeSent) {
        const response = await fetch("/api/auth/send-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();

        if (response.ok) {
          showToast(t("code_sent"), "success");
          setIsCodeSent(true);
          setFormState("verification");
          setLoading(false);
        } else {
          setErrorMessage(data.message || t("failed_to_send_code"));
          setLoading(false);
        }
      } else {
        if (!email || !verificationCode || !password || !confirmPassword) {
          setErrorMessage(t("fill_fields"));
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setErrorMessage(t("passwords_not_match"));
          setLoading(false);
          return;
        }

        const response = await fetch("/api/users/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, verificationCode, password }),
        });

        const data = await response.json();

        if (response.ok) {
          showToast(t("reset_success"), "success");
          router.push(`/${locale}/login`);
        } else {
          setErrorMessage(data.message || t("failed_to_reset_password"));
        }
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(t("try_again"));
      setLoading(false);
    }
  };

  const togglePassword = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    nextIndex?: number,
    prevIndex?: number
  ) => {
    const value = e.target.value;

    setter(value);

    if (value && nextIndex !== undefined) {
      inputRefs.current[nextIndex]?.focus();
    }

    if (!value && prevIndex !== undefined) {
      inputRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="p-8 md:w-1/3 lg:w-1/4 bg-white rounded-xl">
      <p className="text-center font-bold text-green-500 lg:text-xl mb-4">
        Ifrane<span className="text-black">X.</span>
      </p>

      {!isCodeSent && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t("reset_forgot_password")}
          </h2>
          <p className="text-gray-500 text-center mb-2">
            {t("reset_description")}
          </p>
        </>
      )}
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
            {errorMessage}
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

      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`transition-all ${formState === "email" ? "" : "hidden"}`}
        >
          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=""
              required={formState === "email"}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              {t("email")}
            </label>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center text-xs lg:text-sm md:text-md">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  {t("submitting")}..
                </div>
              ) : (
                t("submit_button")
              )}
            </button>
          </div>
        </div>

        <div
          className={`transition-all ${
            formState === "verification" ? "" : "hidden"
          }`}
        >
          {isCodeSent && (
            <>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Image
                    src="/verify.svg"
                    alt="verify"
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  <label
                    className="block text-sm ml-1 font-semibold text-indigo-700"
                    htmlFor="verificationCode1"
                  >
                    {t("verification_code")}
                  </label>
                </div>
                <div className="flex gap-2">
                  {[setOne, setTwo, setThree, setFour].map((setter, index) => (
                    <input
                      key={index}
                      type="text"
                      value={[one, two, three, four][index]}
                      onChange={(e) =>
                        handleVerificationCodeChange(
                          e,
                          setter,
                          index < 3 ? index + 1 : undefined,
                          index > 0 ? index - 1 : undefined
                        )
                      }
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                      maxLength={1}
                      required={formState === "verification"}
                    />
                  ))}
                </div>
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
                  {t("new_pass")}
                </label>
                <button
                  type="button"
                  onClick={() => togglePassword("password")}
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                >
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
              </div>

              <div className="mb-4 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                  placeholder=" "
                  required={formState === "verification"}
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  {t("conf_new_pass")}
                </label>
                <button
                  type="button"
                  onClick={() => togglePassword("confirmPassword")}
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                >
                  {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <span className="loading loading-spinner loading-sm mr-2"></span>
                      {t("resetting")}..
                    </div>
                  ) : (
                    t("reset_button")
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </form>

      <div className="flex items-center justify-between">
        <span className="flex align-baseline text-sm">
          <Image
            src="/return.svg"
            alt="return"
            width={18}
            height={18}
            className="mr-1"
          />
          <a
            className="text-indigo-700 font-semibold"
            href={`/${locale}/login`}
          >
            {t("return")}
          </a>
        </span>
      </div>
    </div>
  );
};
