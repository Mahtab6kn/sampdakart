import React from "react";
import { MenuItem, Typography } from "@material-tailwind/react";

const ProfileMenuItem = React.forwardRef(
  ({ label, closeMenu, click, isLastItem, icon }, ref) => {
    return (
      <MenuItem
        key={label}
        ref={ref}
        onClick={() => {
          closeMenu();
          click();
        }}
        className={`flex items-center gap-2 rounded ${
          isLastItem
            ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
            : ""
        }`}
      >
        {React.createElement(icon, {
          className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
          strokeWidth: 2,
        })}

        <Typography
          as="span"
          variant="small"
          className="font-normal"
          color={isLastItem ? "red" : "inherit"}
        >
          {label}
        </Typography>
      </MenuItem>
    );
  }
);

ProfileMenuItem.displayName = "ProfileMenuItem";

export default ProfileMenuItem;
