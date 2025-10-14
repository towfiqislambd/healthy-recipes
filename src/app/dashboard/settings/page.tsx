"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import useAuth from "@/Hooks/useAuth";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import Modal from "@/Components/Common/Modal";
import editPassword from "@/Assets/images/edit.png";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useUpdateUser } from "@/Hooks/api/auth_api";
import UpdatePasswordModal from "@/Components/Modals/UpdatePasswordModal";

type formData = {
  name: string;
  email: string;
};

const page = () => {
  // Hook
  const { user } = useAuth();

  // States
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);
  const [profilePic, setProfilePic] = useState<string>(
    user?.avatar ? `${process.env.NEXT_PUBLIC_SITE_URL}/${user?.avatar}` : ""
  );

  // Mutation
  const { mutateAsync: updateUserMutation, isPending } = useUpdateUser();

  // Hook Form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  // Form Data
  const onSubmit = async (data: formData) => {
    setErrorMessage("");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    const isNameChanged = user?.name !== data.name;
    const isFileUploaded = uploadedFile !== null;
    if (!isNameChanged && !isFileUploaded) {
      return setErrorMessage("No changes detected");
    }
    if (isFileUploaded) {
      formData.append("avatar", uploadedFile);
    }
    await updateUserMutation(formData);
    setUploadedFile(null);
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <section className="max-w-[717px] bg-white shadow mx-auto p-5 rounded-lg mt-5 sm:mt-8 2xl:mt-12">
      {/* Dynamic Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
          {errorMessage}
        </div>
      )}

      <h3 className="text-gray-800 font-semibold text-xl lg:text-2xl mb-3">
        User Profile
      </h3>

      <hr className="text-gray-300" />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="mb-5">
          <p className="text-gray-700 font-medium mb-2">Profile picture</p>

          {/* User profile picture */}
          <figure className="size-28 border border-gray-300 rounded-full relative">
            {profilePic ? (
              <Image
                src={profilePic}
                alt="profile"
                fill
                className="size-full rounded-full object-cover"
              />
            ) : (
              <p className="w-full h-full grid place-items-center font-semibold text-4xl rounded-full bg-gray-200">
                {user?.name?.at(0)}
              </p>
            )}

            {/* Change Profile Picture */}
            <label htmlFor="fileUpload" className="cursor-pointer">
              <p className="size-8 rounded-full bg-primary-orange absolute right-0 bottom-0 grid place-items-center">
                <MdOutlineCameraAlt className="text-white" />
              </p>
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </figure>
        </div>

        <div className="mb-5">
          {/* Full name */}
          <div>
            <label htmlFor="name" className="font-medium block w-full mb-[6px]">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              id="name"
              type="text"
              className="border border-[#D0D5DD] bg-[#F9FAFB] outline-none text-accent-gray rounded px-3 py-2 block w-full"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="font-medium block w-full mb-[6px]">
            Email
          </label>
          <input
            readOnly
            id="email"
            {...register("email", { required: true })}
            type="email"
            className="border border-[#D0D5DD] bg-[#F9FAFB] outline-none text-accent-gray rounded px-3 py-2 block w-full opacity-70 cursor-not-allowed"
          />
        </div>

        {/* Reset Password */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-[7px] font-medium px-3 py-2 inline-flex items-center gap-2 border border-[#D0D5DD] text-[15px] lg:text-base text-accent-gray cursor-pointer"
        >
          <Image src={editPassword} alt="edit" />
          <span>Change Password</span>
        </button>

        {/* Save btn */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isPending}
            className={`px-9 group duration-300 transition-all hover:text-primary-orange sm:px-10 font-medium py-2 sm:py-3 rounded-lg bg-primary-orange border border-primary-orange text-white h-12 ${
              isPending
                ? "cursor-not-allowed hover:bg-primary-orange hover:text-white opacity-90"
                : "hover:bg-transparent cursor-pointer"
            }`}
          >
            {isPending ? (
              <span className="flex gap-2 items-center">
                <BiLoaderCircle className="animate-spin text-xl" />
                Saving....
              </span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <UpdatePasswordModal setOpen={setOpen} />
      </Modal>
    </section>
  );
};

export default page;
