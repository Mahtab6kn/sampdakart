"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function TrendingVideo() {
  const [isMounted, setIsMounted] = useState(false);

  const videos = [
    {
      src: "https://youtube.com/shorts/PAXEhwoni_c?si=KN2Bfj439vca52SB",
    },
    {
      src: "https://youtube.com/shorts/6pPGoNvosyg?si=fqAIPLY62jGXNOnA",
    },
    {
      src: "https://youtube.com/shorts/97gHNlMigMs?si=ZE_3C9b48f7Pj3DX",
    },
    {
      src: "https://youtube.com/shorts/QYIyjw-P7zE?si=qgxqjGn5YUFSrszj",
    },
    {
      src: "https://youtube.com/shorts/rVDBxCgU5oA?si=WAFj4dqh1otlchl_",
    },
    {
      src: "https://youtube.com/shorts/9AzqlleyFh8?si=Aks_G8331-sAIk6I",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto py-5 px-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">
        <strong>Our Trending Videos</strong>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {isMounted &&
          videos.map((video, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <ReactPlayer
                url={video.src}
                width="100%"
                className="w-full h-96"
                controls
                muted
                playing={true}
                loop={true}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
