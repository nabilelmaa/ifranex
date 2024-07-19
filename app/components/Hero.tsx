import Image from "next/image";

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="relative lg:w-[500px]">

        <div className="hidden lg:block">
          <Image
            src="/blob01.svg"
            alt="blob"
            width={600}
            height={600}
            className="rounded-md"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4">
            <h1 className="font-bold text-xl lg:text-5xl md:text-5xl text-black">
              Find <span className="text-white">Trusted</span> Handypersons for
              <span className="text-white"> Every Need</span>
            </h1>
            <p className="mt-4 text-md lg:text-xl md:text-xl font-semibold text-black">
              Browse, book, and get the job done{" "}
              <span className="text-white">quickly</span>
            </p>
          </div>
        </div>
        <div className="lg:hidden">
          <h1 className="font-bold text-xl lg:text-5xl md:text-5xl">
            Find <span className="text-green-400">Trusted</span> Handypersons
            for
            <span className="text-green-400"> Every Need</span>
          </h1>
          <p className="mt-4 text-md lg:text-xl md:text-xl font-semibold">
            Browse, book, and get the job done{" "}
            <span className="text-green-400">quickly</span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Image
          src="/hero-blob.png"
          alt="image01"
          width={400}
          height={200}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

//lukin
