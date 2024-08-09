"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/app/components/ui/button";
import { Tabs, Tab } from "@nextui-org/react";
import { useToast } from "@/contexts/ToastContext";
import axios from "axios";
import { tailChase } from "ldrs";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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
      setError(true);
      setErrorMessage(t("passwords_not_match"));
      setIsLoading(false);
      return false;
    }
    if (newPassword.length < 8) {
      setError(true);
      setErrorMessage(t("password_8_characters"));
      setIsLoading(false);
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSave = async () => {
    setError(false);
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
        showToast(t("failed_to_update_profile_picture"), "error");
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
      showToast(t("no_changes"), "alert");
      setIsLoading(false);
      (document.getElementById("account") as HTMLDialogElement).close();
      return;
    }

    try {
      const response = await axios.put("/api/users/update", updatedFields, {
        headers: {
          userId: user?.id,
        },
      });

      if (response.status === 200) {
        showToast(t("toast_updated"), "success");
        setIsLoading(false);

        (document.getElementById("account") as HTMLDialogElement).close();
        resetForm();
        window.location.reload();
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
      setErrorMessage(t("old_password_wrong"));
    }
  };

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setProfileImage(null);
  };

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitRating = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("You need to be logged in to submit a review.", "error");
      return;
    }

    const review = {
      rating,
      comment,
    };

    try {
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        (document.getElementById("rating") as HTMLDialogElement).close();
        setIsLoading(false);
        showToast(t("thank_you_for_review"), "success");
        resetRatingForm();
      } else {
        (document.getElementById("rating") as HTMLDialogElement).close();
        showToast(t("failed_to_submit_review"), "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showToast("An error occurred. Please try again later.", "error");
    }
  };

  const resetRatingForm: () => void = () => {
    setRating(0);
    setComment("");
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`shrink-0 size-4 ${
            i < rating ? "text-yellow-400" : "text-gray-400"
          } transition-colors duration-300 cursor-pointer`}
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="6"
          fill="currentColor"
          viewBox="0 0 16 16"
          onClick={() => handleRatingClick(i + 1)}
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
        </svg>
      );
    }
    return stars;
  };

  const togglePassword = (
    field: "oldPassword" | "newPassword" | "confirmPassword"
  ) => {
    switch (field) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  tailChase.register();

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 w-52 mt-2 bg-white border rounded-lg shadow-lg z-10"
          >
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
                  onClick={() => {
                    (
                      document.getElementById("account") as HTMLDialogElement
                    ).showModal();
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <Image
                      src="/settings.svg"
                      alt="user"
                      width={17}
                      height={17}
                    />
                    <p className="ml-2">{t("manage_acc")}</p>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  onClick={() => {
                    (
                      document.getElementById("rating") as HTMLDialogElement
                    ).showModal();
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <Image
                      src="/review.svg"
                      alt="review"
                      width={17}
                      height={17}
                    />
                    <p className="ml-2">{t("rate_us")}</p>
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
          </motion.div>
        )}
      </AnimatePresence>

      <dialog id="rating" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-6">{t("rate_us")}</h3>
          <div className="flex justify-center mb-4">{renderStars()}</div>
          <div className="relative">
            <textarea
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              value={comment}
              onChange={handleCommentChange}
              rows={4}
            ></textarea>
            <label
              htmlFor="comment"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              {t("leave_comment")}
            </label>
          </div>
          <div className="modal-action">
            <Button
              variant="cancel"
              onClick={() => {
                (
                  document.getElementById("rating") as HTMLDialogElement
                ).close();
                resetForm();
                setError(false);
              }}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="outline"
              className="w-28"
              onClick={handleSubmitRating}
            >
              {isLoading ? (
                <l-tail-chase
                  size="20"
                  speed="1.75"
                  color="black"
                ></l-tail-chase>
              ) : (
                t("submit")
              )}
            </Button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              resetRatingForm();
            }}
          >
            {t("cancel")}
          </button>
        </form>
      </dialog>
      <dialog id="account" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-6">{t("edit_profile")}</h3>
          <Tabs aria-label="Options">
            <Tab key="personal-info" title={t("personal_info")}>
              <div className="grid gap-4 py-4 h-auto overflow-y-auto">
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
                <div className="text-xs text-gray-500">
                  {t("allowed")}*.jpeg, *.jpg, *.png, *.gif
                </div>
                <div className="relative">
                  <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=""
                  />
                  <label
                    htmlFor="username"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("username")}
                  </label>
                </div>
              </div>
            </Tab>
            <Tab key="security" title={t("security")}>
              <div className="flex flex-col gap-4 py-4 h-auto overflow-y-auto">
                {error && (
                  <div
                    id="alert-border-2"
                    className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <p className="ms-3 text-xs lg:text-sm md:text-sm font-medium">
                      {errorMessage}
                    </p>
                  </div>
                )}
                <div className="relative">
                  <input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=""
                  />
                  <label
                    htmlFor="oldPassword"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("curr_pass")}
                  </label>
                  <button
                    type="button"
                    onClick={() => togglePassword("oldPassword")}
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  >
                    <Image
                      src={showOldPassword ? "/eye-off.svg" : "/eye-on.svg"}
                      alt={showOldPassword ? "hide password" : "show password"}
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=""
                  />
                  <label
                    htmlFor="newPassword"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("new_pass")}
                  </label>
                  <button
                    type="button"
                    onClick={() => togglePassword("newPassword")}
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  >
                    <Image
                      src={showNewPassword ? "/eye-off.svg" : "/eye-on.svg"}
                      alt={showNewPassword ? "hide password" : "show password"}
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=""
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("conf_pass")}
                  </label>
                  <button
                    type="button"
                    onClick={() => togglePassword("confirmPassword")}
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  >
                    <Image
                      src={showConfirmPassword ? "/eye-off.svg" : "/eye-on.svg"}
                      alt={
                        showConfirmPassword ? "hide password" : "show password"
                      }
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
              </div>
            </Tab>
          </Tabs>
          <div className="modal-action">
            <Button
              variant="cancel"
              onClick={() => {
                (
                  document.getElementById("account") as HTMLDialogElement
                ).close();
                resetForm();
                setError(false);
              }}
            >
              {t("cancel")}
            </Button>
            <Button variant="outline" className="w-28" onClick={handleSave}>
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
          <button>{t("cancel")}</button>
        </form>
      </dialog>
    </div>
  );
};

export default Avatar;
