import { Suspense } from "react";
import { Spin } from "antd";
import LoginForm from "@/components/LoginForm/LoginForm";

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Spin size="large" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}