import { SignInForm } from "@/app/components/forms/SignInForm";
import { ToastProvider } from "@/contexts/ToastContext";
const Page = () => {
  return (
    <div className="pt-24 lg:pt-0 min-h-screen lg:flex lg:items-center lg:justify-center md:items-center md:justify-center">
      <SignInForm />
    </div>
  );
};

export default Page;
