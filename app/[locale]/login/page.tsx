import { SignInForm } from "@/app/components/forms/SignInForm";

const Page = () => {
  return (
    <div className="p-6 min-h-screen flex items-center justify-center md:items-center md:justify-center bg-gradient-to-bl from-indigo-600 via-indigo-400 to-indigo-200">
      <SignInForm />
    </div>
  );
};

export default Page;
