import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "next-intl";

const Avatar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 rounded-full transition-all"
      >
        <Image
          src="/avt.avif"
          alt="User avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-46 mt-2 bg-white border rounded-lg shadow-lg z-10">
          <div className="px-4 py-3 text-sm text-gray-900 text-center">
            <div>{user?.username}</div>
            <div className="font-semibold truncate text-gray-700 text-xs">
              {user?.email}
            </div>
          </div>
          <hr className="flex-grow border-gray-300" />
          <ul className="py-2 text-sm text-gray-700">
          <li>
              <a
                href={`/${locale}/booking-history`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Image
                    src="/manage-user.svg"
                    alt="user"
                    width={17}
                    height={17}
                  />
                  <p className="ml-2">Manage account</p>
                </div>
              </a>
            </li>
            <hr className="flex-grow border-gray-300" />
            <li>
              <a
                href={`/${locale}/booking-history`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Image
                    src="/history.svg"
                    alt="history"
                    width={17}
                    height={17}
                  />
                  <p className="ml-2">History</p>
                </div>
              </a>
            </li>
            <li>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="/earnings" className="block px-4 py-2 hover:bg-gray-100">
                Earnings
              </a>
            </li>
          </ul>
          <hr className="flex-grow border-gray-300" />
          <div className="py-1">
            <button
              onClick={logout}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Image
                  src="/log-out.svg"
                  alt="log-out-icon"
                  width={17}
                  height={17}
                />
                <p className="ml-2">Log out</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;