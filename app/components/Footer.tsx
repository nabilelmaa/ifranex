// import Image from "next/image";

// export const Footer = () => {
//   return (
//     <footer className="relative bg-gray-800 text-white pt-10">
//       {/* Wave Blob */}
//       <div className="absolute inset-x-0 top-0 transform -translate-y-1/2">
//         <Image
//           src="/footer.svg"
//           alt="wave blob"
//           width={1440}
//           height={300}
//           className="w-full h-auto"
//         />
//       </div>

//       {/* Footer Content */}
//       <div className="relative z-10 container mx-auto px-4 py-10">
//         <div className="flex flex-col items-center justify-between space-y-6 md:space-y-0 md:flex-row">
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-bold">Footer Title</h2>
//             <p className="mt-2 text-gray-400">Additional footer text or links can go here.</p>
//           </div>
//           <div className="text-center md:text-right">
//             <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  return (
    <section className="p-8" id="footer">
      <div className="flex flex-col md:flex-row justify-between p-6 font-sans">
        <div className="mb-6 md:mb-0 md:w-1/4">
          <p className="font-bold text-green-500 lg:text-xl mb-4">
            Ifrane<span className="text-black">X.</span>
          </p>
          <div className="">
            <div className="text-lg font-semibold mb-4 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#22c55e"}
                fill={"none"}
              >
                <path
                  d="M11.0065 21H9.60546C6.02021 21 4.22759 21 3.11379 19.865C2 18.7301 2 16.9034 2 13.25C2 9.59661 2 7.76992 3.11379 6.63496C4.22759 5.5 6.02021 5.5 9.60546 5.5H13.4082C16.9934 5.5 18.7861 5.5 19.8999 6.63496C20.7568 7.50819 20.9544 8.7909 21 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20.0167 20.0233L21.9998 22M21.0528 17.5265C21.0528 15.5789 19.4739 14 17.5263 14C15.5786 14 13.9998 15.5789 13.9998 17.5265C13.9998 19.4742 15.5786 21.0531 17.5263 21.0531C19.4739 21.0531 21.0528 19.4742 21.0528 17.5265Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.9998 5.5L15.9004 5.19094C15.4054 3.65089 15.1579 2.88087 14.5686 2.44043C13.9794 2 13.1967 2 11.6313 2H11.3682C9.8028 2 9.02011 2 8.43087 2.44043C7.84162 2.88087 7.59411 3.65089 7.0991 5.19094L6.99976 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <p className="ml-2">{t("job")}</p>
            </div>
            <p>{t("join_team")}</p>
            <Link href={`${locale}/apply`}>
              <button className="p-2 border rounded-full bg-green-400 hover:bg-green-500 mt-4 text-white transition">
                {t("apply_to_join")}
              </button>
            </Link>
          </div>
        </div>
        <div className="mb-6 md:mb-0 md:w-1/4">
          <p className="text-lg lg:text-xl md:text-xl font-bold mb-4">{t("company")}</p>
          <ul className="text-gray-500">
            <li className="hover:underline transition mt-2">{t("about_us")}</li>
            <li className="hover:underline transition mt-2">
              {t("customer_reviews")}
            </li>
            <li className="hover:underline transition mt-2">{t("pricing")}</li>
            <li className="hover:underline transition mt-2">
              {t("company_policies")}
            </li>
            <li className="hover:underline transition mt-2">
              {t("terms_and_services")}
            </li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0 md:w-1/4">
          <p className="text-lg lg:text-xl md:text-xl font-bold mb-4">{t("services")}</p>
          <ul className="text-gray-500">
            <li className="hover:underline transition mt-2">
              {t("tap_repair_and_replacement")}
            </li>
            <li className="hover:underline transition mt-2">
              {t("toilet_and_shower_leaks")}
            </li>
            <li className="hover:underline transition mt-2">
              {t("kitchen_installations")}
            </li>
            <li className="hover:underline transition mt-2">
              {t("bathroom_installations")}
            </li>
            <li className="hover:underline transition mt-2">
              {t("emergency_plumber")}
            </li>
            <li className="hover:underline transition mt-2">
              {t("baby_sitting")}
            </li>
          </ul>
        </div>
        <div className="md:w-1/4">
          <p className="text-lg lg:text-xl md:text-xl font-bold mb-4">{t("get_in_touch")}</p>
          <ul className="text-gray-500">
            <li className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#22c55e"}
                fill={"none"}
              >
                <path
                  d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="ml-2">+212 6 11223344</p>
            </li>
            <li className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#22c55e"}
                fill={"none"}
              >
                <path
                  d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 18.9253C4.37609 19.7766 6.07112 19.4671 9.46118 18.8481C10.4097 18.6686 11.411 18.909 12.2285 19.5121L12.485 19.7053C13.3015 20.3084 14.413 20.3084 15.2295 19.7053L15.486 19.5121C16.3035 18.909 17.3048 18.6686 18.2533 18.8481C21.6434 19.4671 23.3384 19.7766 24.4696 18.9253C25.6007 18.0739 25.6334 16.5412 25.6988 13.4756L25.8835 5.74714C25.9268 3.8314 25.9268 2.87353 25.428 2.3047C24.9292 1.73587 24.0306 1.5 22.2334 1.5H9.76663C7.96941 1.5 7.0708 1.73587 6.57197 2.3047C6.07314 2.87353 6.07314 3.8314 6.11645 5.74714L6.30121 13.4756Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="ml-2">example@email.com</p>
            </li>
            <li className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#22c55e"}
                fill={"none"}
              >
                <path
                  d="M9.63342 12.8837C11.2245 14.476 13.918 14.476 15.5091 12.8837C17.1002 11.2914 17.1002 8.59916 15.5091 7.00685C13.918 5.41454 11.2245 5.41454 9.63342 7.00685C8.04232 8.59916 8.04232 11.2914 9.63342 12.8837Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3.76924 17.7074C6.6214 20.5596 11.3022 20.5596 14.1544 17.7074C17.0065 14.8553 17.0065 10.1744 14.1544 7.32229C11.3022 4.47013 6.6214 4.47013 3.76924 7.32229C0.91708 10.1744 0.91708 14.8553 3.76924 17.7074Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <p className="ml-2">Ifrane, Morocco</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 flex justify-center md:justify-between flex-wrap">
        <p className="text-gray-500 text-sm py-4 md:pl-4 text-left lg:text-center">
          {t("rights_reserved")} &copy; {new Date().getFullYear()}{" "}
        </p>
      </div>
    </section>
  );
};
