// import { motion } from "framer-motion";
// import Image from "next/image";

// const steps = [
//   {
//     src: "/sign-in.svg",
//     alt: "Sign In",
//     title: "Step 1: Sign In",
//     description: "Create an account or sign in to start using our service.",
//   },
//   {
//     src: "/choose.svg",
//     alt: "Choose",
//     title: "Step 2: Choose a Service",
//     description: "Browse through our services and choose the one you need.",
//   },
//   {
//     src: "/fill-form.svg",
//     alt: "Fill Form",
//     title: "Step 3: Fill Out the Form",
//     description: "Provide the necessary details by filling out the form.",
//   },
//   {
//     src: "/confirm-process.svg",
//     alt: "Confirm Process",
//     title: "Step 4: Confirm the Process",
//     description: "Review your details and confirm the process.",
//   },
//   {
//     src: "/pay.svg",
//     alt: "Pay",
//     title: "Step 5: Make Payment",
//     description: "Complete the payment to finalize your booking.",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.3,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export const HowItWorks = () => {
//   return (
//     <section id="how-it-works" className="py-16 px-6 md:px-12 bg-gray-50">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
//         <p className="text-gray-600 mt-2">Follow these simple steps to get started</p>
//       </div>
//       <motion.div
//         className="flex flex-col md:flex-row justify-around items-center"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {steps.map((step, index) => (
//           <motion.div
//             key={index}
//             className="flex flex-col items-center text-center mb-8 md:mb-0 md:w-1/5 p-4 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300"
//             variants={itemVariants}
//           >
//             <div className="w-24 h-24 mb-4">
//               <Image
//                 src={step.src}
//                 alt={step.alt}
//                 width={96}
//                 height={96}
//                 className="w-full h-full"
//               />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
//             <p className="text-gray-600 mt-2">{step.description}</p>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// };
