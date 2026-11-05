"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logowhite from "@/public/images/logowhite.png";
import Button from "@/components/atoms/button";
import apple from "@/public/images/apple.png";
import google from "@/public/images/google.png";
import linkedin from "@/public/images/linkedin.png";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { login } from "@/lib/queries";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()
  const { mutateAsync, isPending, isError, error } = login();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.email || !formData.password) {
      return;
    }
    try {
      const data = await mutateAsync(formData);
      if(data.success){
       return router.replace("/dashboard")
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="bg-aorange p-3 rounded-2xl inline-flex items-center justify-center shadow-md">
          <Image src={logowhite} alt="autoparts" className="w-9" />
        </div>
      </div>

      <div className="text-center font-geist-sans mb-6">
        <h2 className="text-2xl font-medium text-primary">
          Sign in to your account
        </h2>
        <p className="font-medium text-secondary mt-1">
          Enter your details to login
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="transparent"
          className="border border-bordercolor focus:ring-orange-500 w-full rounded-lg h-12"
        >
          <Image src={apple} alt="apple" className="" />
        </Button>
        <Button
          variant="transparent"
          className="border border-bordercolor focus:ring-orange-500 w-full rounded-lg h-12"
        >
          <Image src={google} alt="google" className="" />
        </Button>
        <Button
          variant="transparent"
          className="border border-bordercolor focus:ring-orange-500 w-full rounded-lg h-12"
        >
          <Image src={linkedin} alt="linkedin" className="" />
        </Button>
      </div>
      <div className="flex items-center gap-2 py-5">
        <hr className="w-full border border-dashed border-bordercolor" />
        <span className="font-geist-sans text-xs text-secondary">OR</span>
        <hr className="w-full border border-dashed border-bordercolor" />
      </div>
      {/* Core Controlled Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="block text-sm font-inter text-secondary mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-secondary text-sm">
              <Mail size={18} />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-9 pr-3 py-2.5 border border-bordercolor rounded-lg text-sm font-geist-sans focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-secondary font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-inter text-secondary mb-1">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-secondary text-sm">
              <LockKeyhole size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-9 pr-10 py-2.5 border border-bordercolor rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-secondary font-medium"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary cursor-pointer hover:text-gray-600 text-sm"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between  font-medium font-geist-sans text-secondary text-sm pt-1">
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe} // Controlled checked attribute
              onChange={handleInputChange}
              className="rounded border-[#F7F6F9] 0 focus:ring-orange-500 mr-2"
            />
            Keep me logged in
          </label>
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-aorange border-[#E86701] drop-shadow-aorange hover:bg-[#E86701] disabled:bg-orange-300 text-white font-medium py-3 rounded-lg shadow-md transition mt-6 text-sm flex items-center justify-center ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Sign in"
          )}
        </button>
        {isError && (
            <div className="p-2 mt-1 w-full bg-red-100 border border-red-300 text-red-700 rounded animate-shake">
              {error.message}
            </div>
          )}
      </form>

      <p className="text-base text-center text-primary font-inter font-medium mt-4">
        Don't have an account?{" "}
        <Link href="/signup" className="text-aorange hover:underline">
          Signup
        </Link>
      </p>
    </>
  );
}
