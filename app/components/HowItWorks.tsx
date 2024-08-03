import Image from "next/image";
export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 px-6 md:p-2">
      <div>
        <Image
          src="/how-1.svg"
          alt="how-1"
          width={400}
          height={400}
          className="rounded-lg"
        />
      </div>
    </section>
  );
};
