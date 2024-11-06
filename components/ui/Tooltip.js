"use client";
import { Tooltip } from "@material-tailwind/react";

export default function TooltipFooter({ label, children }) {
  return (
    <Tooltip
      content={label}
      placement="top-start"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      className="border border-blue-gray-50 bg-white text-black px-4 py-3 shadow-xl shadow-black/10 capitalize"
    >
      {children}
    </Tooltip>
  );
}
