"use client";
import { ToastSuccess } from "@/app/components/ui/ToastSuccess";
import { ToastFailed } from "@/app/components/ui/ToastFailed";
import { createContext, ReactNode, useContext, useState } from "react";

interface Toast {
  show: boolean;
  message: string;
  type: "success" | "error";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    console.log("Showing toast:", { message, type }); 
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-50 sm:bottom-auto sm:right-auto sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:mx-auto">
          {toast.type === "success" ? (
            <ToastSuccess message={toast.message} />
          ) : (
            <ToastFailed message={toast.message} />
          )}
        </div>
      )}
    </ToastContext.Provider>
  );
};
