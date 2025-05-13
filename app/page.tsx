"use client";

import * as React from "react";
import { VerificationForm } from "../components/VerificationForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">Sales Verification</h1>
          <p className="text-slate-500 mt-2 text-sm">Complete the verification process below</p>
        </div>
        <VerificationForm />
        <div className="text-center mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} ZAVIS. All rights reserved.
        </div>
      </div>
    </div>
  );
} 