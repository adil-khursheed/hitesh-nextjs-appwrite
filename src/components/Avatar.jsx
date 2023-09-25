import Image from "next/image";
import React from "react";

const Avatar = ({ img, alt }) => {
  return (
    <div className="rounded-full overflow-hidden w-full pt-[100%] relative">
      <div className="absolute inset-0">
        <Image src={img} alt={alt || img} />
      </div>
    </div>
  );
};

export default Avatar;
