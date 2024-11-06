"use client";
import Nav from "@/components/layout/home/NavHeader/Nav";
import CreateSubAdmin from "@/components/modals/admin/sub-admin/CreateSubAdmin";
import DefaultBtn from "@/components/ui/buttons/DefaultBtn";
import Heading from "@/components/ui/heading/Heading";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  IconButton,
  ListItemPrefix,
  Switch,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";

const Page = () => {
  const [open, setOpen] = useState(false);

  const [admins, setAdmins] = useState([]);

  const fetchingSubAdmins = async () => {
    try {
      const response = await fetch("/api/admin/sub-admin");
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
      toast.error("error", err);
    }
  };

  useEffect(() => {
    fetchingSubAdmins();
  }, []);
  const handleChangeRole = async (isAdmin, admin) => {
    try {
      const response = await fetch(`/api/admin/sub-admin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...admin,
          role: `${isAdmin ? "admin" : "user"}`,
        }),
      });
      if (response.ok) {
        toast.success("Role updated successfully!");
        fetchingSubAdmins();
      } else {
        toast.error("Failed to update role");
      }
    } catch (err) {
      toast.error("error", err);
    }
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleChangeDeleteDialog = () => setOpenDeleteDialog(!openDeleteDialog);
  const [selectedAdminToDelete, setSelectedAdminToDelete] = useState({});

  const handleDeleteAdmin = async () => {
    try {
      const response = await fetch(`/api/admin/sub-admin/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAdminToDelete),
      });

      if (response.ok) {
        toast.success("Admin account deleted successfully!");
        setOpenDeleteDialog(false);
        fetchingSubAdmins();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete admin account: ${errorData.message}`);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Dialog
        open={openDeleteDialog}
        handler={handleChangeDeleteDialog}
        animate={{
          mount: { scale: 1 },
          unmount: { scale: 0 },
        }}
      >
        <div className="p-6 flex flex-col gap-4">
          <Heading
            icon={
              <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1.5 rounded-full inline-block text-white">
                <FaUserMinus size={16} />
              </div>
            }
            title={"Delete Admin Account"}
            buttons={[
              <IconButton
                key={1}
                variant="text"
                onClick={handleChangeDeleteDialog}
              >
                <RxCross1 size={20} />
              </IconButton>,
            ]}
          />
          <div className="px-4 py-2 rounded-md bg-red-50 text-red-500 flex items-center gap-1">
            <AiFillInfoCircle />
            Do you really want to delete this account!
          </div>
          <div className="flex justify-end gap-4 items-center">
            <Button
              onClick={handleChangeDeleteDialog}
              variant="outlined"
              color="teal"
              className="rounded"
            >
              Cancel
            </Button>
            <Button
              className="rounded"
              onClick={() => {
                setOpenDeleteDialog(false);
                handleDeleteAdmin();
              }}
              variant="gradient"
              color="red"
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>

      <div className="flex justify-center items-start min-h-[89vh]">
        <Card className="w-full md:w-3/4 p-0 md:p-4 mt-10 shadow-none">
          <div className="flex justify-between items-center px-4 mb-2">
            <Heading
              icon={
                <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1.5 rounded-full inline-block text-white">
                  <FaTshirt size={16} />
                </div>
              }
              title={"All Admins"}
              buttons={[
                <DefaultBtn
                  key={1}
                  title={"Create new admin"}
                  clickHandler={() => setOpen(true)}
                />,
              ]}
            />
            <CreateSubAdmin
              open={open}
              setOpen={setOpen}
              setAdmins={setAdmins}
            />
          </div>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
            {admins.map((admin) => (
              <li
                className="w-full flex justify-between p-4 rounded-lg hover:bg-gray-100 transition-all"
                key={admin._id}
              >
                <div className="flex items-center w-full">
                  <ListItemPrefix>
                    <Avatar variant="circular" alt="admin" src={admin.image.url} />
                  </ListItemPrefix>
                  <div className="flex flex-col max-w-24 lg:max-w-36 xl:max-w-full">
                    <div className="text-sm w-full truncate">{admin.name}</div>
                    <div className="font-semibold text-pink-500 text-sm md:text-md">
                      {admin.phoneNumber}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Switch
                    label={admin.role === "admin" ? "Admin" : "User"}
                    color="pink"
                    defaultChecked={admin.role === "admin"}
                    onChange={(e) => {
                      handleChangeRole(e.target.checked, admin);
                    }}
                  />
                  <IconButton
                    variant="text"
                    color="red"
                    onClick={() => {
                      handleChangeDeleteDialog();
                      setSelectedAdminToDelete(admin);
                    }}
                  >
                    <MdDelete size={20} />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Page;
