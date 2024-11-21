"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  MusicalNoteIcon,
  GlobeAltIcon,
  TruckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: MusicalNoteIcon,
    title: "Quality Instruments",
    description: "Experience the finest sounds with our premium instruments.",
  },
  {
    icon: StarIcon,
    title: "Trusted by Many",
    description: "Join our community of satisfied customers worldwide.",
  },
  {
    icon: GlobeAltIcon,
    title: "Global Reach",
    description: "Delivering cultural heritage across the globe.",
  },
  {
    icon: TruckIcon,
    title: "Fast Shipping",
    description: "Reliable and quick delivery to your doorstep.",
  },
];

export default function StateSection() {
  const [hoveredCard, setHoveredCard] = useState("");

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 text-white py-16 relative overflow-hidden mb-5">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-10 bg-repeat"></div>
      <div className="max-w-7xl mx-auto text-center px-4 relative z-10">
        <Typography
          variant="h1"
          color="white"
          className="mb-6 animate-fade-in-down"
        >
          Discover the Magic of Sampdakart
        </Typography>
        <Typography
          variant="lead"
          color="white"
          className="mb-12 max-w-2xl mx-auto animate-fade-in-up"
        >
          Immerse yourself in the rich cultural tapestry of Ayodhya with our
          curated selection of musical instruments and divine statues.
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`mt-6 bg-white/90 backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out transform ${
                hoveredCard === index ? "scale-105 shadow-lg" : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardBody className="flex flex-col items-center p-6">
                <IconButton
                  color="amber"
                  className={`mb-4 rounded-full p-5 ${
                    hoveredCard === index ? "animate-bounce" : ""
                  }`}
                >
                  <feature.icon className="h-6 w-6" />
                </IconButton>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {feature.title}
                </Typography>
                <Typography color="gray" className="text-center font-normal">
                  {feature.description}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/10 to-transparent"></div>
    </div>
  );
}
