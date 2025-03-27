"use client";
import React from "react";
import Link from "next/link";
import {useRouter} from 'next/navigation';

function page() {
  const router=useRouter();
  function handleRedirection(){
    router.push("/signup")
  }
  return (
    <>
      <div className="m-4 p-4flex justify-center text-center text-4xl">
        <div>click on the below button to sign up</div>
        <button className=" m-5 px-8 py-5 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200" onClick={handleRedirection}>click to sign up &rarr;
        {/* <Link href={"/signup"}>click to sign up &rarr;</Link> */}
        </button>
      </div>
    </>
  );
}

export default page;
