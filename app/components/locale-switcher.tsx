import React, { useState, useTransition, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", name: "English", shortName: "EN", flag: "/usa.png" },
  { code: "fr", name: "Français", shortName: "FR", flag: "/france.png" },
];

function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const onSelectChange = (code: string) => {
    if (code === localeActive) return;
    const newPathname = pathname.replace(`/${localeActive}`, `/${code}`);
    startTransition(() => {
      router.replace(newPathname);
    });
    setIsOpen(false);
  };

  const activeLanguage =
    languages.find((lang) => lang.code === localeActive) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center bg-white rounded-full px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={activeLanguage.flag}
          alt={localeActive}
          width={20}
          height={20}
          className="mr-2 rounded-sm"
        />
        <span className="mr-1 hidden sm:inline">{activeLanguage.name}</span>
        <span className="mr-1 sm:hidden">{activeLanguage.shortName}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="origin-top-right absolute right-0 mt-2 w-32 lg:w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          >
            <div className="py-1">
              {languages.map((language) => (
                <motion.div
                  key={language.code}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                      language.code === localeActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700"
                    } hover:bg-gray-50 disabled:opacity-50`}
                    onClick={() => onSelectChange(language.code)}
                    disabled={isPending || language.code === localeActive}
                  >
                    <Image
                      src={language.flag}
                      alt={language.name}
                      width={20}
                      height={20}
                      className="mr-3 rounded-sm"
                    />
                    <span className="hidden sm:inline">{language.name}</span>
                    <span className="sm:hidden">{language.shortName}</span>
                    {language.code === localeActive && (
                      <svg
                        className="ml-auto h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LocaleSwitcher;
