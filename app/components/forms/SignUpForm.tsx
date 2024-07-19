"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";

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
          setIsCodeSent(true);
          setFormState("verification");
          setLoading(false);
        } else {
          setErrorMessage(data.message || "Failed to send verification email");
          setLoading(false);
        }
      } else {
        if (!email || !verificationCode || !username || !password) {
          setErrorMessage("Please fill out all fields.");
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
          setErrorMessage(data.message || "Failed to verify email");
        }
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
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
    <div className="bg-white p-8 rounded-lg shadow-xl md:w-1/3 lg:w-1/4">
      <p className="text-center font-bold text-green-500 lg:text-xl mb-4">
        Ifrane<span className="text-black">X.</span>
      </p>
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("create_account")}
      </h2>

      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`transition-all ${formState === "email" ? "" : "hidden"}`}
        >
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Image
                src="/mail.svg"
                alt="user-icon"
                width={20}
                height={20}
                className="mr-1"
              />
              <label
                className="block text-gray-700 text-sm ml-1"
                htmlFor="email"
              >
                {t("email")}
              </label>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-300 focus:outline-none"
              required={formState === "email"}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-black hover:bg-white hover:text-black text-white border hover:border-black w-full px-4 py-2 rounded-md transition-colors duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center text-xs lg:text-sm md:text-md">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
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
                    className="block text-sm ml-1 font-semibold text-red-500"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-300 focus:outline-none text-center"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-300 focus:outline-none text-center"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-300 focus:outline-none text-center"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-300 focus:outline-none text-center"
                    maxLength={1}
                    required={formState === "verification"}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Image
                    src="/user.svg"
                    alt="user-icon"
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  <label
                    className="block text-gray-700 text-sm ml-1"
                    htmlFor="username"
                  >
                    {t("username")}
                  </label>
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-300 focus:outline-none"
                  required={formState === "verification"}
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Image
                    src="/lock.svg"
                    alt="lock"
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  <label
                    className="block text-gray-700 text-sm ml-1"
                    htmlFor="password"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full pr-10 focus:border-blue-300 focus:outline-none"
                    required={formState === "verification"}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  >
                    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-black hover:bg-white hover:text-black text-white border hover:border-black w-full px-4 py-2 rounded-md transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <span className="loading loading-spinner loading-sm mr-2"></span>
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

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="inline-block align-baseline text-xs lg:text-sm md:text-sm">
          {t("have_account")}{" "}
          <a
            className="text-blue-500 hover:text-blue-800"
            href={`/${locale}/login`}
          >
            {t("sign_in")}
          </a>
        </span>
      </div>
      <div className="col-span-6 mt-6">
        <p className="text-xs md:text-xs lg:text-sm text-gray-500">
          By creating an account, you agree to our
          <a
            href={`/${locale}/terms&conditions`}
            className="text-gray-700 underline"
          >
            {" "}
            terms and conditions{" "}
          </a>
          and{" "}
          <a
            href={`/${locale}/privacy&policy`}
            className="text-gray-700 underline"
          >
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
