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
import { useLocale } from "next-intl";

function OTPModal() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const locale = useLocale();

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
        router.push(`/${locale}/admin`);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } else {
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>Admin</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify Admin Access</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the 6-digit OTP to proceed.
            </AlertDialogDescription>
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
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOtp(["", "", "", "", "", ""])}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleVerifyOtp}>
              Verify
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default OTPModal;
