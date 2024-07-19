"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const languages = [
  { code: 'en', name: 'English', flag: '/usa.png' },
  { code: 'fr', name: 'Français', flag: '/france.png' },
];

function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname();

  const onSelectChange = (code: string) => {
    if (code === localeActive) return; // Prevents selecting the same language
    const newPathname = pathname.replace(`/${localeActive}`, `/${code}`);
    startTransition(() => {
      router.replace(newPathname);
    });
  };

  return (
    <div className="relative inline-block text-left">
      <Select onValueChange={onSelectChange}>
        <SelectTrigger className="flex items-center p-2 border rounded-full hover:bg-gray-200 transition-all">
          <Image
            src={languages.find((lang) => lang.code === localeActive)?.flag || ''}
            alt={localeActive}
            width={24}
            height={24}
            className="mr-2"
          />
          <SelectValue
            placeholder={languages.find((lang) => lang.code === localeActive)?.name || 'Select Language'}
          />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code} disabled={isPending}>
              <div className="flex items-center">
                <Image
                  src={language.flag}
                  alt={language.name}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default LocaleSwitcher;
