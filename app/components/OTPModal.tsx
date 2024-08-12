"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/app/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useToast } from "@/contexts/ToastContext";
import Cookies from "js-cookie";

function OTPModal() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const { showToast } = useToast();
  const t = useTranslations("OTP");

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];

    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }

    if (value === "" && index > 0) {
      newOtp[index] = "";
      setOtp(newOtp);
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const combinedOtp = otp.join("");

      if (combinedOtp.length === 6) {
        const response = await fetch("/api/auth/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pin: combinedOtp }),
        });

        const data = await response.json();

        if (response.ok && data.token) {
          const token = data.token;
          Cookies.set("isAdmin", "true", { expires: 1 });
          Cookies.set("authToken", token, { expires: 1 });
          router.push(`/${locale}/admin/dashboard`);
          showToast(t("access_granted"), "success");
        } else {
          showToast(t("invalid_otp"), "error");
        }
      } else {
        showToast(t("enter_valid_otp"), "error");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showToast(t("oops_error"), "error");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>{t("admin")}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("verify_admin")}</AlertDialogTitle>
            <div className="flex justify-center space-x-2 mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-10 h-10 text-center border rounded-md focus:border-slate-200"
                  maxLength={1}
                />
              ))}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOtp(["", "", "", "", "", ""])}
            >
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction className="bg-slate-200 hover:bg-slate-300 text-gray-900"onClick={handleVerifyOtp}>
              {t("verify")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default OTPModal;
