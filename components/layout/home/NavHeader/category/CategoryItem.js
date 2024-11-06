"use client";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Link from "next/link";

const CategoryItem = ({ category }) => {
  return (
    <Menu allowHover>
      <MenuHandler>
        <Link
          href={`/category/${category.name.replaceAll(" ", "-")}`}
          className="cursor-pointer capitalize"
        >
          {category.name}
        </Link>
      </MenuHandler>
      <MenuList>
        {category?.subCategories?.map((sub, index) => {
          return (
            <Link
              key={index}
              href={`/category/${category.name.replaceAll(
                " ",
                "-"
              )}/${sub.name.replaceAll(" ", "-")}`}
              className="outline-none capitalize"
            >
              <MenuItem>{sub.name}</MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default CategoryItem;
