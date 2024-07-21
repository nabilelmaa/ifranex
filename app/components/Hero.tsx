import Image from "next/image";

export const Hero = () => {
  return (
    <div className="py-12 lg:py-20 md:py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap xl:items-center -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
              Find <span className="text-green-500">Trusted</span> Handypersons for
              <span className="text-green-500"> Every Need</span>
            </h1>
            <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
              We’re different. Flex is the only saas business platform that lets
              you run your business on one platform, seamlessly across all
              digital channels.
            </p>
            <div className="flex flex-wrap">
              <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                <a
                  className="inline-block px-5 py-3 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-green-500 rounded-md shadow-sm"
                  href="#"
                >
                  Get Started
                </a>
              </div>
              <div className="w-full md:w-auto py-1 md:py-0">
                <a
                  className="inline-block px-5 py-3 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm"
                  href="#"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="relative mx-auto md:mr-0 max-w-max">
              <Image
                src="/circle3-yellow.svg"
                alt=""
                width={45}
                height={45}
                className="absolute z-10 -left-14 -top-12 w-28 md:w-auto"
              />
              <Image
                src="/dots3-blue.svg"
                alt=""
                width={45}
                height={45}
                className="absolute z-10 -right-7 -bottom-8 w-28 md:w-auto"
              />
              <Image
                src="https://res.cloudinary.com/dcncaesb0/image/upload/v1718902555/hrh-ifrane/bdlwaqzjihochxude97o.jpg"
                alt=""
                width={400}
                height={300}
                className="relative rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex flex-col lg:flex-row justify-between items-center">
    //   <div className="relative lg:w-[500px]">

    //     <div className="hidden lg:block">
    //       <Image
    //         src="/blob01.svg"
    //         alt="blob"
    //         width={600}
    //         height={600}
    //         className="rounded-md"
    //       />
    //       <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4">
    //         <h1 className="font-bold text-xl lg:text-5xl md:text-5xl text-black">
    //           Find <span className="text-white">Trusted</span> Handypersons for
    //           <span className="text-white"> Every Need</span>
    //         </h1>
    //         <p className="mt-4 text-md lg:text-xl md:text-xl font-semibold text-black">
    //           Browse, book, and get the job done{" "}
    //           <span className="text-white">quickly</span>
    //         </p>
    //       </div>
    //     </div>
    //     <div className="lg:hidden">
    //       <h1 className="font-bold text-xl lg:text-5xl md:text-5xl">
    //         Find <span className="text-green-400">Trusted</span> Handypersons
    //         for
    //         <span className="text-green-400"> Every Need</span>
    //       </h1>
    //       <p className="mt-4 text-md lg:text-xl md:text-xl font-semibold">
    //         Browse, book, and get the job done{" "}
    //         <span className="text-green-400">quickly</span>
    //       </p>
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     <Image
    //       src="/hero-blob.png"
    //       alt="image01"
    //       width={400}
    //       height={200}
    //       className="rounded-md"
    //     />
    //   </div>
    // </div>
  );
};

//lukin
