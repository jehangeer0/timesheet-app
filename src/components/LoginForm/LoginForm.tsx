"use client";

import type React from "react";
import { useState } from "react";
import { Input, Button, Checkbox, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      message.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        message.error("Invalid email or password");
        setLoading(false);
      } else if (result?.ok) {
        message.success("Login successful!");
        router.push(callbackUrl);
        router.refresh();
      } else {
        message.error("Login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 md:px-12 py-12 lg:py-0">
        <div className="w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Welcome back
          </h1>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </label>

              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </label>

              <Input.Password
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="flex items-center">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="ml-3 text-gray-600 font-normal cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg h-auto"
            >
              Sign in
            </Button>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-1">
                Demo Credentials:
              </p>
              <p className="text-sm text-blue-700 mb-0">
                Email: demo@example.com
              </p>
              <p className="text-sm text-blue-700 mb-0">
                Password: password123
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center px-6 sm:px-8 md:px-12 py-12 lg:py-0 min-h-96 lg:min-h-screen">
        <div className="text-white text-center lg:text-left max-w-md">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">ticktock</h2>
          <p className="text-lg sm:text-base text-blue-100 leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any internet-connected
            device.
          </p>
        </div>
      </div>
    </div>
  );
}