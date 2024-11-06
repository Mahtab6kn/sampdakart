import { CameraIcon } from "@heroicons/react/24/outline";
import { CardHeader } from "@material-tailwind/react";

import Image from "next/image";
import React, { useState } from "react";

const ProfileImage = ({ session }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState(session?.user?.image.url);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CardHeader
      floated={false}
      className="h-80 cursor-pointer bg-gray-50 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={image}
        alt="Profile Picture"
        fill
        className="rounded-full"
        style={{
          objectFit: "contain",
          objectPosition: "top",
        }}
      />

      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black transition-all backdrop-blur-sm bg-opacity-10">
          <label className="cursor-pointer relative w-full h-full flex items-center justify-center">
            <CameraIcon className="h-10 w-10 text-white" />
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
              aria-label="Upload Profile Picture"
            />
          </label>
        </div>
      )}
    </CardHeader>
  );
};

export default ProfileImage;
