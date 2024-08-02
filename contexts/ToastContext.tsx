"use client";
import { ToastSuccess } from "@/app/components/ui/toast-success";
import { ToastFailed } from "@/app/components/ui/toast-fail";
import { ToastAlert } from "@/app/components/ui/toast-alert";
import { createContext, ReactNode, useContext, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

interface Toast {
  show: boolean;
  message: string;
  type: "success" | "error" | "alert";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "alert") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const toastVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 }
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "alert" = "success"
  ) => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            className="fixed top-4 right-4 z-50 pointer-events-none"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={toastVariants}
          >
            {toast.type === "success" && <ToastSuccess message={toast.message} />}
            {toast.type === "error" && <ToastFailed message={toast.message} />}
            {toast.type === "alert" && <ToastAlert message={toast.message} />}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};