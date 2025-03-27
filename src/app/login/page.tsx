"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttondisabled, setbuttonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onLogin() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      console.log("login success", response.data);
      router.push("/userprofile");
    } catch (error: any) {
      console.log("login failed due to " + error.message);
      toast.error(error.message);
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div>
        <LoginForm
          user={user}
          setUser={setUser}
          onLogin={onLogin}
          buttondisabled={buttondisabled}
          // setbuttonDisabled={setbuttonDisabled}
          loading={loading}
          // setLoading={setLoading}
        />
      </div>
    </>
  );
}

export default LoginPage;
