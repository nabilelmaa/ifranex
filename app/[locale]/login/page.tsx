import { SignInForm } from "@/app/components/forms/SignInForm";
import { ToastProvider } from "@/contexts/ToastContext";
const Page = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen lg:flex lg:items-center lg:justify-center md:items-center md:justify-center">
        <SignInForm />
      </div>
    </ToastProvider>
  );
};

export default Page;

