"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  async function getUserProfile() {
    try {
      const response = await axios.get("/api/users/userprofile");
      console.log(response.data.data._id);
      setData(response.data.data._id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function handleLogout() {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center min-h-screen m-3 py-5">
      <h1 className="p-4 m-4">PROFILE PAGE</h1>
      <hr />
      <button
        className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 m-5"
        onClick={getUserProfile}
      >
        User Profile
      </button>
      <h1>{data===""?"":<Link href={`/userprofile/${data}`}>test{data}</Link>}</h1>

      <button
        className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 m-4 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        onClick={handleLogout}
      >
        LogOut &rarr;
      </button>
    </div>
  );
}

export default ProfilePage;
