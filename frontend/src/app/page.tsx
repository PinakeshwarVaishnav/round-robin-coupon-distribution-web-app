"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Home() {
  const [coupon, setCoupon] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/claim",
        {},
        { withCredentials: true },
      );
      setCoupon(response.data.coupon);
      setMessage("Coupon claimed successfully!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 429) {
          setMessage(error.response.data.message);
        }
      } else {
        setMessage("Failed to claim coupon.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkCookie = async () => {
      if (!Cookies.get("cookieId")) {
        try {
          await axios.post(
            "http://localhost:3001/api/claim",
            {},
            { withCredentials: true },
          );
        } catch (error) {
          console.error("Error setting cookie:", error);
        }
      }
    };
    checkCookie();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">
        Round-Robin Coupon Distributor
      </h1>
      {message && <p className="mb-2 text-red-500">{message}</p>}
      {coupon && <p className="text-xl mb-4">Your coupon: {coupon}</p>}
      <button
        onClick={handleClaim}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        Claim Coupon
      </button>
    </div>
  );
}
