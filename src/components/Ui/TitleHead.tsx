/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import back from '/icons/back.svg'
import { Link } from "react-router";

interface title {
    href: any,
    title: string
}

const TitleHead = ({
    href,title
} : title) => {
  return (
    <div className="flex items-center justify-between mb-4 pt-5 pb-3">
      <Link
        to={href}
        className="rounded-full bg-primary size-7 flex items-center justify-center"
      >
        <img src={back} alt="back" className="size-3.5" />
      </Link>
      <h1 className="text-xl font-bold">
        {title}
      </h1>
      <div className="w-6"></div>
    </div>
  );
};

export default TitleHead;
