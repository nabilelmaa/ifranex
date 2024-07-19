import { useTranslations } from "next-intl";

export const WhyUs = () => {
  const t = useTranslations("Us");
  return (
    <section id="us">
      <div className="flex items-center justify-center bg-green-400 w-full py-12 px-4 md:p-24 bg-pattern rounded-md">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-12 w-full max-w-5xl">
          <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">
            {t("title")}
          </h2>
          <p className="text-gray-500 mt-4 text-sm md:text-base lg:text-md">
            {t("description")}
          </p>
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={42}
                  height={42}
                  color={"#22c55e"}
                  fill={"none"}
                >
                  <path
                    d="M16.177 18.4559C16.4776 18.6002 16.8504 18.973 17.0308 19.2737C17.0909 19.6945 17.3916 18.0711 18.8586 17.1091M21.5 18.001C21.5 20.2101 19.7091 22.001 17.5 22.001C15.2909 22.001 13.5 20.2101 13.5 18.001C13.5 15.7918 15.2909 14.001 17.5 14.001C19.7091 14.001 21.5 15.7918 21.5 18.001Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="11.0078"
                    cy="12.001"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7.50765 18.001C8.45765 17.101 9.25765 16.601 11.0327 16.501M19.5077 11.501C19.5077 10.701 19.5327 8.25098 19.4077 7.25098C19.3327 6.42598 19.1077 5.30098 18.0827 4.65098C17.4577 4.32598 16.8577 4.02598 13.9827 4.00098M7.95765 4.00098C5.80765 4.00098 4.13265 4.17598 3.30766 5.20098C2.60766 6.15764 2.64932 7.25098 2.58265 7.60098C2.43265 9.47598 2.53265 16.026 2.53265 17.126C2.53265 18.276 2.45765 20.6135 4.03265 21.401C5.38265 22.076 6.78265 21.976 11.5327 22.001"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.8577 2.00105C10.2577 2.00105 9.75765 2.00105 9.25765 2.52605C8.83265 2.92605 8.89859 3.27928 8.73265 3.90105C8.49913 4.77605 8.38241 5.23753 8.70766 5.60105C9.00582 5.99135 9.50697 5.99262 9.9495 5.99373L9.95766 5.99376C10.3827 6.02385 11.8112 6.01007 12.2327 5.99376C12.6855 5.97622 13.05 5.95105 13.3577 5.55105C13.6327 5.19355 13.4696 4.59861 13.3077 3.97605C13.1479 3.36181 13.2077 3.05105 12.7827 2.52605C12.1827 1.92605 11.4577 2.00105 10.8577 2.00105Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="font-semibold text-center md:text-left">
                {t("qualified_people")}
              </p>
              <p className="text-gray-500 text-start md:text-left text-sm mt-2">
                {t("qualified_people_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={42}
                  height={42}
                  color={"#22c55e"}
                  fill={"none"}
                >
                  <path
                    d="M5.04798 8.60657L2.53784 8.45376C4.33712 3.70477 9.503 0.999914 14.5396 2.34474C19.904 3.77711 23.0904 9.26107 21.6565 14.5935C20.2227 19.926 14.7116 23.0876 9.3472 21.6553C5.36419 20.5917 2.58192 17.2946 2 13.4844"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V12L14 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-semibold text-center md:text-left">
                {t("services_24_7")}
              </p>
              <p className="text-gray-500 text-start md:text-left text-sm mt-2">
                {t("services_24_7_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={42}
                  height={42}
                  color={"#22c55e"}
                  fill={"none"}
                >
                  <path
                    d="M13.9448 18.1667V12.8333M15.5073 12.8333V11.5M15.5073 19.5V18.1667M13.9448 15.5H17.0698M17.0698 15.5C17.5876 15.5 18.0073 15.9477 18.0073 16.5V17.1667C18.0073 17.719 17.5876 18.1667 17.0698 18.1667H13.0073M17.0698 15.5C17.5876 15.5 18.0073 15.0523 18.0073 14.5V13.8333C18.0073 13.281 17.5876 12.8333 17.0698 12.8333H13.0073"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5025 9C11.914 9 9.00488 11.9101 9.00488 15.5C9.00488 19.0898 11.914 22 15.5025 22C19.091 22 22.0002 19.0899 22.0002 15.5C22.0002 13.4728 21.0871 11.6633 19.6435 10.4488M14.0051 2C7.92492 2 2.95996 6.47715 2.95996 12.1931C2.95996 14.1463 3.58972 15.9532 4.64245 17.4321M4.5354 11.4545C4.5354 7.95147 7.4818 5.09091 11.0051 5.09091C12.2431 5.09091 13.3984 5.43191 14.3668 6.01662"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00516 6C11.3177 6 14.003 5.10457 14.003 4C14.003 2.89543 11.3177 2 8.00516 2C4.69264 2 2.00732 2.89543 2.00732 4C2.00732 5.10457 4.69264 6 8.00516 6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 4V8.02171V12.0434C2 12.7473 3.17905 13.6328 6.1323 14M2.10733 8.54768C3.3124 9.60965 5.4609 10.0602 7.75706 10.0602M13.9957 4.12134V6.13597"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-semibold text-center md:text-left">
                {t("competitive_pricing")}
              </p>
              <p className="text-gray-500 text-start md:text-left text-sm mt-2">
                {t("competitive_pricing_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
