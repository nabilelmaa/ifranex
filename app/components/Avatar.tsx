import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "next-intl";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Tabs, Tab } from "@nextui-org/react";
import { useToast } from "@/contexts/ToastContext";
import axios from "axios";
import { tailChase } from "ldrs";

const Avatar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const colors = ["bg-gray-300"];
  const { showToast } = useToast();

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [avatarColor, setAvatarColor] = useState(getRandomColor());
  const [username, setUsername] = useState(user?.username || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return false;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSave = async () => {
    setIsLoading(true);
    const updatedFields: any = {};

    if (username !== user?.username) {
      updatedFields.username = username;
    }

    if (profileImage) {
      try {
        const formData = new FormData();
        formData.append("file", profileImage);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
        );

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

        const cloudinaryResponse = await axios.post(cloudinaryUrl, formData);

        if (cloudinaryResponse.status === 200) {
          updatedFields.profilePicture = cloudinaryResponse.data.secure_url;
        } else {
          setIsLoading(false);
          throw new Error("Failed to upload image to Cloudinary");
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        showToast(
          "Failed to upload profile picture. Please try again.",
          "error"
        );
        return;
      }
    }

    if (oldPassword && newPassword) {
      if (!validatePasswords()) {
        return;
      }
      updatedFields.oldPassword = oldPassword;
      updatedFields.newPassword = newPassword;
    }

    if (Object.keys(updatedFields).length === 0) {
      showToast("No changes to update", "alert");
      return;
    }

    try {
      const response = await axios.put("/api/users/update", updatedFields, {
        headers: {
          userId: user?.id,
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        showToast("Profile updated successfully!", "success");

        (document.getElementById("my_modal_2") as HTMLDialogElement).close();
        resetForm();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user information", error);
      showToast("Failed to update profile. Please try again.", "error");
    }
  };

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setProfileImage(null);
  };

  tailChase.register();
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full text-white ${avatarColor} transition-all`}
      >
        {user && user.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt={user.username || "User"}
            width={35}
            height={35}
            className="object-cove rounded-full"
          />
        ) : (
          <div
            className={`w-full h-full flex rounded-full items-center justify-center ${avatarColor}`}
          >
            {user && user.username ? user.username.charAt(0).toUpperCase() : ""}
          </div>
        )}
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
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                onClick={() =>
                  (
                    document.getElementById("my_modal_2") as HTMLDialogElement
                  ).showModal()
                }
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
              </button>
            </li>
            <li>
              <a
                href={`/${locale}/messages`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Image
                    src="/inbox.svg"
                    alt="history"
                    width={17}
                    height={17}
                  />
                  <p className="ml-2">Inbox</p>
                </div>
              </a>
            </li>
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

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-6">Edit Profile</h3>
          <Tabs aria-label="Options">
            <Tab key="personal-info" title="Personal Information">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Image
                    src={user?.profilePicture || "/default-avatar.png"}
                    alt="profile picture"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />

                  <Input
                    type="file"
                    id="profileImage"
                    onChange={handleImageChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-start">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
            </Tab>
            <Tab key="security" title="Security">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="oldPassword" className="text-start text-xs">
                    Current Password
                  </Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newPassword" className="text-start text-xs">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-start text-xs"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </div>
            </Tab>
          </Tabs>
          <div className="modal-action">
            <Button
              variant="cancel"
              onClick={() => {
                (
                  document.getElementById("my_modal_2") as HTMLDialogElement
                ).close();
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button variant="outline" onClick={handleSave}>
              {isLoading ? (
                <l-tail-chase
                  size="20"
                  speed="1.75"
                  color="black"
                ></l-tail-chase>
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Avatar;
