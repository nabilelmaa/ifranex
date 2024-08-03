import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("Avatar");

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
        showToast(t("toast_updated"), "success");

        (document.getElementById("my_modal_2") as HTMLDialogElement).close();
        resetForm();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user information", error);
      showToast(t("toast_error"), "error");
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
        className={`ml-4 relative flex items-center justify-center w-9 h-9 rounded-full overflow-hidden text-white ${avatarColor} transition-all border-2 border-indigo-700 focus:border-3 focus:border-indigo-700`}
      >
        {user && user.profilePicture ? (
          <div className="absolute inset-0">
            <Image
              src={user.profilePicture}
              alt={user.username || "User"}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
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
                    src="/mng-user.svg"
                    alt="user"
                    width={17}
                    height={17}
                  />
                  <p className="ml-2">{t("manage_acc")}</p>
                </div>
              </button>
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
                <p className="ml-2 text-red-500 font-semibold">
                  {t("log_out")}
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-6">{t("edit_profile")}</h3>
          <Tabs aria-label="Options">
            <Tab key="personal-info" title={t("personal_info")}>
              <div className="grid gap-4 py-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 group">
                  <Image
                    src={user?.profilePicture || "/default-avatar.png"}
                    alt="profile picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <img
                      src="/camera.svg"
                      alt="Camera"
                      className="w-8 h-8 mb-2"
                    />
                    <span className="text-white text-xs text-center">
                      {t("update_photo")}
                    </span>
                  </div>

                  <input
                    type="file"
                    id="profileImage"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".jpeg,.jpg,.png,.gif"
                  />
                </div>

                <div className="mt-1 text-xs text-gray-500">
                  {t("allowed")}*.jpeg, *.jpg, *.png, *.gif
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-start">
                    {t("username")}
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
            <Tab key="security" title={t("security")}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="oldPassword" className="text-start text-xs">
                    {t("curr_pass")}
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
                    {t("new_pass")}
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="col-span-3 w-45"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-start text-xs"
                  >
                    {t("conf_pass")}
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
              {t("cancel")}
            </Button>
            <Button variant="outline" onClick={handleSave}>
              {isLoading ? (
                <l-tail-chase
                  size="20"
                  speed="1.75"
                  color="black"
                ></l-tail-chase>
              ) : (
                t("save")
              )}
            </Button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button> {t("cancel")}</button>
        </form>
      </dialog>
    </div>
  );
};

export default Avatar;
