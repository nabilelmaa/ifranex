"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";
import { tailspin } from "ldrs";

export const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        if (!email || !verificationCode || !username || !password) {
          setErrorMessage(t("fill_fields"));
          setLoading(false);
          return;
        }

        const response = await fetch("/api/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, verificationCode, username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          showToast(t("account_created"), "success");
          router.push(`/${locale}/services`);
        } else {
          setErrorMessage(data.message || t("failed_to_verify"));
        }
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(t("try_again"));
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  tailspin.register();

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
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("create_account")}
      </h2>
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
                  <span className="mr-2 mt-1">
                    <l-tailspin
                      size="15"
                      stroke="1"
                      speed="0.6"
                      color="black"
                    ></l-tailspin>
                  </span>
                  {t("sending_code")}..
                </div>
              ) : (
                t("verify")
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
                  <input
                    type="text"
                    value={one}
                    onChange={(e) => handleVerificationCodeChange(e, setOne, 1)}
                    ref={(el) => {
                      inputRefs.current[0] = el!;
                    }}
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                    maxLength={1}
                    required={formState === "verification"}
                  />
                  <input
                    type="text"
                    value={two}
                    onChange={(e) =>
                      handleVerificationCodeChange(e, setTwo, 2, 0)
                    }
                    ref={(el) => {
                      inputRefs.current[1] = el;
                    }}
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                    maxLength={1}
                    required={formState === "verification"}
                  />
                  <input
                    type="text"
                    value={three}
                    onChange={(e) =>
                      handleVerificationCodeChange(e, setThree, 3, 1)
                    }
                    ref={(el) => {
                      if (el) inputRefs.current[2] = el;
                    }}
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                    maxLength={1}
                    required={formState === "verification"}
                  />
                  <input
                    type="text"
                    value={four}
                    onChange={(e) =>
                      handleVerificationCodeChange(e, setFour, undefined, 2)
                    }
                    ref={(el) => {
                      if (el) inputRefs.current[3] = el;
                    }}
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                    maxLength={1}
                    required={formState === "verification"}
                  />
                </div>
              </div>
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                  placeholder=""
                  required={formState === "verification"}
                />
                <label
                  htmlFor="username"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  {t("username")}
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
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
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
                      <span className="mr-2 mt-1">
                        <l-tailspin
                          size="15"
                          stroke="1"
                          speed="0.6"
                          color="black"
                        ></l-tailspin>
                      </span>
                      {t("submitting")}..
                    </div>
                  ) : (
                    t("submit_button")
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </form>

      <div className="flex items-center justify-between">
        <span className="inline-block align-baseline text-sm">
          {t("have_account")}{" "}
          <a className="text-indigo-700" href={`/${locale}/login`}>
            {t("sign_in")}
          </a>
        </span>
      </div>
      <div className="col-span-6 mt-6">
        <p className="text-sm text-gray-500">
          By creating an account, you agree to our
          <a
            href={`/${locale}/terms&conditions`}
            className="text-indigo-700 underline"
          >
            {" "}
            terms and conditions{" "}
          </a>
          and{" "}
          <a
            href={`/${locale}/privacy&policy`}
            className="text-indigo-700 underline"
          >
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
