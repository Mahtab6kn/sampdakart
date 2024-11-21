"use client";

import React from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  MusicalNoteIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function HomeBanner() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex items-center justify-center py-5 md:py-0 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <img
          src="/home/ayodhyamandir.avif"
          alt="Ayodhya background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <Card className="w-full max-w-4xl bg-white/80 shadow-xl z-10">
        <CardBody className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8">
            <Typography
              variant="h1"
              color="amber"
              className="mb-4 text-4xl lg:text-5xl font-bold"
            >
              Divine Harmony: Instruments & Statues
            </Typography>
            <Typography variant="lead" color="blue-gray" className="mb-8">
              Discover the perfect blend of spiritual resonance and artistic
              craftsmanship. Our collection of musical instruments and religious
              statues brings the essence of Ayodhya to your sacred space.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/category"}>
                <Button
                  size="lg"
                  color="amber"
                  className="flex items-center justify-center"
                >
                  <MusicalNoteIcon className="h-5 w-5 mr-2" />
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/home/mi-1.jpeg"
                alt="Traditional musical instrument"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <img
                src="/home/inst-3.jpg"
                alt="Ornate religious statue"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <img
                src="/home/inst-2.avif"
                alt="Devotional music performance"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <img
                src="/home/inst-1.jpg"
                alt="Temple architecture detail"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
