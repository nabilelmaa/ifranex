import React, { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const languages = [
  { code: 'en', name: 'EN', flag: '/usa.png' },
  { code: 'fr', name: 'FR', flag: '/france.png' },
];

function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname();

  const onSelectChange = (code: string) => {
    if (code === localeActive) return;
    const newPathname = pathname.replace(`/${localeActive}`, `/${code}`);
    startTransition(() => {
      router.replace(newPathname);
    });
    setIsOpen(false);
  };

  const activeLanguage = languages.find((lang) => lang.code === localeActive) || languages[0];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={activeLanguage.flag}
            alt={localeActive}
            width={24}
            height={24}
            className="mr-2"
          />
          <Image
            src="/arrow-down.svg"
            alt="Open menu"
            width={18}
            height={18}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-2 text-sm text-gray-700">
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => onSelectChange(language.code)}
                  disabled={isPending || language.code === localeActive}
                >
                  <Image
                    src={language.flag}
                    alt={language.name}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <span>{language.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LocaleSwitcher;