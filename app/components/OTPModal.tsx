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

function OTPModal() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const { showToast } = useToast();
  const t = useTranslations("OTP");

  const admin_passcode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE;

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

  const handleVerifyOtp = () => {
    const combinedOtp = otp.join("");

    if (combinedOtp.length === 6) {
      if (combinedOtp === admin_passcode) {
        setIsVerified(true);
        setError("");
        router.push(`/${locale}/admin/dashboard`);
        showToast(t("access_granted"), "success");
      } else {
        showToast(t("invalid_otp"), "error");
      }
    } else {
      showToast(t("enter_valid_otp"), "error");
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
                  className="w-10 h-10 text-center border rounded-md"
                  maxLength={1}
                />
              ))}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-red-200 text-red-600 hover:bg-red-300 hover:text-red-600"
              onClick={() => setOtp(["", "", "", "", "", ""])}
            >
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleVerifyOtp}>
              {t("verify")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default OTPModal;
