"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import Modal from "@/Components/Common/Modal";
import editPassword from "@/Assets/images/edit.png";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useUpdateUser } from "@/Hooks/api/auth_api";
import UpdatePasswordModal from "@/Components/Modals/UpdatePasswordModal";

const page = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(
    user?.avatar ? `${process.env.NEXT_PUBLIC_SITE_URL}/${user?.avatar}` : ""
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const { mutateAsync: updateUserMutation, isPending } = useUpdateUser();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    const isNameChanged = user?.name !== data.name;
    const isFileUploaded = uploadedFile !== null;
    if (!isNameChanged && !isFileUploaded) {
      return toast.error("No changes detected");
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
      <h3 className="text-headingTextColor font-semibold text-xl lg:text-2xl mb-3">
        User Profile
      </h3>

      <hr />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="mb-5">
          <p className="text-headingTextColor font-medium mb-2">
            Profile picture
          </p>

          {/* User profile picture */}
          <figure className="size-28 border rounded-full relative">
            {profilePic ? (
              <img
                src={profilePic}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <p className="w-full h-full grid place-items-center font-semibold text-4xl rounded-full bg-gray-200">
                {user?.name?.at(0)}
              </p>
            )}

            {/* Change Profile Picture */}
            <label htmlFor="fileUpload" className="cursor-pointer">
              <p className="size-8 rounded-full bg-primary absolute right-0 bottom-0 grid place-items-center">
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
              className="border border-[#D0D5DD] bg-[#F9FAFB] outline-none text-primaryTextColor rounded px-3 py-2 block w-full"
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
            className="border border-[#D0D5DD] bg-[#F9FAFB] outline-none text-primaryTextColor rounded px-3 py-2 block w-full opacity-70"
          />
        </div>

        {/* Reset Password */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-[7px] font-medium px-3 py-2 inline-flex items-center gap-2 border border-[#D0D5DD] text-[15px] lg:text-base text-primaryTextColor"
        >
          <Image src={editPassword} alt="edit" className="" />
          <span>Change Password</span>
        </button>

        {/* Save btn */}
        <div className="mt-6">
          <button
            type="submit"
            className={`px-9 group duration-300 transition-all hover:text-primary sm:px-10 font-medium py-2 sm:py-3 rounded-lg bg-primary border border-primary text-white border-primaryBgColor h-12 ${
              isPending ? "cursor-not-allowed" : "hover:bg-transparent"
            }`}
            disabled={isPending}
          >
            {isPending ? (
              <ImSpinner9 className="animate-spin text-white text-xl" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>

      {/* modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <UpdatePasswordModal setOpen={setOpen} />
      </Modal>
    </section>
  );
};

export default page;
