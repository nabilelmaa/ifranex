import { SignUpForm } from "@/app/components/forms/SignUpForm";

const page = () => {
  return (
    <div className="p-6 min-h-screen flex items-center justify-center md:items-center md:justify-center bg-gradient-to-bl from-rose-100 to-teal-100">
      <SignUpForm />
    </div>
  );
};
export default page;
