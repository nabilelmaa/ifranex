"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";
import { tailspin } from "ldrs";

export const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
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

        if (!validatePasswords()) {
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
          setError(true);
          if (locale === "en") {
            if (data.message === "Invalid verification code") {
              setErrorMessage(t("invalid_code"));
            } else {
              setErrorMessage(t("user_exist"));
            }
          } else {
            if (data.message === "Invalid verification code") {
              setErrorMessage(t("invalid_code"));
            } else {
              setErrorMessage(t("user_exist"));
            }
          }
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

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    index: number
  ) => {
    const value = e.target.value;

    if (value.length === 1) {
      setter(value);
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length === 0) {
      setter("");
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (value.length === 4) {
      const values = value.split("");
      setOne(values[0]);
      setTwo(values[1]);
      setThree(values[2]);
      setFour(values[3]);
      inputRefs.current[3]?.focus();
    }
  };
  const validatePasswords = () => {
    if (password.length < 8) {
      setError(true);
      setErrorMessage(t("password_8_must_be_characters"));
      setLoading(false);
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasteData = e.clipboardData.getData("text");
    if (pasteData.length === 4) {
      const values = pasteData.split("");
      setOne(values[0]);
      setTwo(values[1]);
      setThree(values[2]);
      setFour(values[3]);
      inputRefs.current[3]?.focus();
      e.preventDefault();
    }
  };

  tailspin.register();

  return (
    <div className="p-8 md:w-1/3 lg:w-1/4 bg-white">
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
      <h2 className="text-xl font-bold text-center mb-4">
        {t("create_account")}
      </h2>
      {error && (
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
                <div className="flex gap-2" onPaste={handlePaste}>
                  {[setOne, setTwo, setThree, setFour].map((setter, index) => (
                    <input
                      key={index}
                      type="text"
                      value={[one, two, three, four][index]}
                      onChange={(e) =>
                        handleVerificationCodeChange(e, setter, index)
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
                  {showPassword ? (
                    <Image
                      src="/eye-off.svg"
                      alt="eye-on"
                      width={18}
                      height={18}
                    />
                  ) : (
                    <Image
                      src="/eye-on.svg"
                      alt="eye-on"
                      width={18}
                      height={18}
                    />
                  )}
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
          {t("by_creating")}
          <a
            href={`/${locale}/terms&conditions`}
            className="text-indigo-700 underline"
          >
            {" "}
            {t("terms_and_conditions")}{" "}
          </a>
          {t("and")}{" "}
          <a
            href={`/${locale}/privacy&policy`}
            className="text-indigo-700 underline"
          >
            {t("privacy_policy")}
          </a>
          .
        </p>
      </div>
    </div>
  );
};
