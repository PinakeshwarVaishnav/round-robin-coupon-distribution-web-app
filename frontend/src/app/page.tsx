import React from "react";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coupon Distribution System
          </h1>
          <p className="text-lg text-gray-600">
            Claim your coupon below. Each user can claim one coupon per hour.
          </p>
        </div>
      </div>
    </main>
  );
}
