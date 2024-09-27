"use client";
import { ToastSuccess } from "@/app/components/ui/toast-success";
import { ToastFailed } from "@/app/components/ui/toast-fail";
import { ToastAlert } from "@/app/components/ui/toast-alert";
import { createContext, ReactNode, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
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
      2000
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={toastVariants}
          >
            {toast.type === "success" && (
              <ToastSuccess message={toast.message} />
            )}
            {toast.type === "error" && <ToastFailed message={toast.message} />}
            {toast.type === "alert" && <ToastAlert message={toast.message} />}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};
