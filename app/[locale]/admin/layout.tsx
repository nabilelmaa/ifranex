"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/ui/sidebar";
import {
  IconStar,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconLogout,
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const { logout } = useAuth();
  const t = useTranslations("Admin");

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  const links = [
    {
      label: t("dashboard"),
      href: `/${locale}/admin/dashboard`,
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t("services"),
      href: `/${locale}/admin/services`,
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t("reviews"),
      href: `/${locale}/admin/reviews`,
      icon: (
        <IconStar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: t("users"),
      href: `/${locale}/admin/users`,
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className={cn("flex h-screen overflow-hidden")}>
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <button onClick={handleLogout}>
              <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />
            </button>
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
};

const Logo: React.FC = () => (
  <Image
    src="/ifranex.png"
    alt="logo"
    width={90}
    height={90}
    layout="intrinsic"
    className="cursor-pointer"
  />
);

export default Layout;
