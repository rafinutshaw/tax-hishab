import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-center border-b-2 absolute w-full left-0 right-0 bg-blue-300">
      <div className="container flex justify-between items-center ">
        <div className="flex-grow h-14 flex items-center">
          <Image src={"/logo.png"} alt="applogo" width={200} height={50} />
        </div>
        <div className="flex gap-2 font-bold">
          <Link href={"#"} className=" hover:text-blue-800">
            Jobs
          </Link>
          <Link href={"#"} className=" hover:text-blue-800">
            Notifications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
