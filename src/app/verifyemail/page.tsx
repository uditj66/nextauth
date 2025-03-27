import axios from "axios";
import { log } from "console";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';

function VerifyEmailpage() {
  const router=useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("No Error");
  const [verified, setVerified] = useState(false);

  async function verifyEmail() {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
      }); /* token bhej rha ha url se nikal ka */
      console.log(response);
      setVerified(true);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  }
  useEffect(() => {
    const urltoken = window.location.search.split("=")[1];
    setToken(urltoken || "");
    // const {query}=router;
    // const urltoken2=query.token
  
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }

    
  }, [token]);
  return (
    <div className="flex flex-col justify-center max-h-screen py-2">
      <h1>VERIFY EMAIL PAGE</h1>

      <h2>{token?`${token}`:`no token`}</h2>

      <h2>{verified?`${verified}`:'not verified'}</h2>
    </div>
  );
}

export default VerifyEmailpage;
