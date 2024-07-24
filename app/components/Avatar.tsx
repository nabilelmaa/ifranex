import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "next-intl";

const Avatar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const colors = [
    // "bg-gray-400",
    "bg-blue-500",
    // "bg-green-500",
    // "bg-yellow-500",
    // "bg-purple-500",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [avatarColor, setAvatarColor] = useState(getRandomColor());
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full text-white ${avatarColor} transition-all`}
      >
        {user && user.username ? user.username.charAt(0).toUpperCase() : ""}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-52 mt-2 bg-white border rounded-lg shadow-lg z-10">
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
                href={`/${locale}/services`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Image
                    src="/services.svg"
                    alt="history"
                    width={17}
                    height={17}
                  />
                  <p className="ml-2">Services</p>
                </div>
              </a>
            </li>
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
            <hr className="flex-grow border-gray-300" />
            <li>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                <div className="flex items-center">
                  <Image
                    src="/support.svg"
                    alt="history"
                    width={17}
                    height={17}
                  />
                  <p className="ml-2">Support</p>
                </div>
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
