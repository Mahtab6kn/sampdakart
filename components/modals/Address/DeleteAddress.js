"use client";
import Heading from "@/components/ui/heading/Heading";
import { Button, Dialog, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const DeleteAddress = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1 },
        unmount: { scale: 0 },
      }}
      className="p-6 flex flex-col gap-4"
    >
      <Heading
        icon={
          <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
            <FaRegTrashCan size={20} color="white" />
          </div>
        }
        title={"Delete"}
        buttons={[
          <IconButton key={1} variant="text" onClick={handleOpen}>
            <RxCross1 size={20} />
          </IconButton>,
        ]}
      />
      <div className="flex items-center gap-1 bg-red-50 text-red-700 px-4 py-1 my-4 rounded-md">
        <div className="flex gap-1">
          <MdOutlineError size={25} />
          <span>Are you sure you want to delete the address</span>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <Button
          variant="outlined"
          size="sm"
          className="rounded"
          color="red"
          onClick={handleOpen}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          size="sm"
          className="rounded"
          color="red"
          type="submit"
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );
};

export default DeleteAddress;
