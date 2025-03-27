"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignupForm } from "@/components/SignUpForm";

function SignUpPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttondisabled, setbuttonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSignUp() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed due to " + error.message);
      toast.error(error.message);
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div>
        <SignupForm
          user={user}
          setUser={setUser}
          onSignUp={onSignUp}
          buttondisabled={buttondisabled}
          // setbuttonDisabled={setbuttonDisabled}
          loading={loading}
          // setLoading={setLoading}
        />
      </div>
    </>
  );
}

export default SignUpPage;
