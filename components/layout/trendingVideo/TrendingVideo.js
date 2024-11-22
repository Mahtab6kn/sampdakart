"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function TrendingVideo() {
  const [isMounted, setIsMounted] = useState(false);

  const videos = [
    {
      src: "https://www.youtube.com/shorts/jwxmkiiBuno",
    },
    {
      src: "https://www.youtube.com/shorts/YSFUd-I-msU",
    },
    {
      src: "https://www.youtube.com/shorts/rqnY_2nZ03c",
    },
    {
      src: "https://www.youtube.com/shorts/LSxy67gPNVo",
    },
    {
      src: "https://youtube.com/shorts/qEBpzelj-Ec?si=Dr5U6lKK3TQBn7F9",
    },
    {
      src: "https://youtube.com/shorts/qSMkGvhyfPk?si=33j3Skk94ziSMGSn",
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
