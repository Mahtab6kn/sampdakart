"use client";
import Heading from "@/components/ui/heading/Heading";
import {
  Button,
  Dialog,
  IconButton,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { MdOutlineError } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { TiCancelOutline } from "react-icons/ti";
import { toast } from "sonner";

const CancelOrder = ({ open, setOpen, id, setData }) => {
  const { data: session } = useSession();
  const [pending, setPending] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [canceledBy, setCanceledBy] = useState(session.user.role);
  const handleOpen = () => setOpen(!open);

  const handleCancel = async (
    e,
    id,
    newStatus,
    cancellationReason,
    canceledBy
  ) => {
    e.preventDefault();
    setPending(true);
    try {
      const res = await fetch(`/api/private/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          cancellationReason,
          canceledBy,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setData(data);
        handleOpen();
        toast.success("Order canelled successfully");
      } else {
        handleOpen();
        toast.error("Failed to cancel the order");
      }
    } catch (error) {
      console.error("Failed to cancel order", error);
    } finally {
      setPending(false);
    }
  };

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
            <TiCancelOutline size={25} color="white" />
          </div>
        }
        title={"Cancel"}
        buttons={[
          <IconButton key={1} variant="text" onClick={handleOpen}>
            <RxCross1 size={20} />
          </IconButton>,
        ]}
      />
      <form
        onSubmit={(e) =>
          handleCancel(e, id, "canceled", cancellationReason, canceledBy)
        }
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-1 bg-red-50 text-red-700 px-4 py-1 my-4 rounded-md">
          <div className="flex gap-1">
            <MdOutlineError size={25} />
            Are you sure you want to cancel the Order{" "}
          </div>
        </div>
        <div>
          {session.user.role === "admin" ? (
            <Input
              variant="static"
              label="Cancellation Reason"
              placeholder=""
              required
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            />
          ) : (
            <Select
              label="Please select the reason for your Cancellation "
              color="blue"
              value={cancellationReason}
              onChange={(value) => setCancellationReason(value)}
            >
              <Option value="Accidental purchase">Acciedental Purchase</Option>
              <Option value="Changed my mind">Changed My Mind</Option>
              <Option value="Need to Add/Remove items">
                Need to Add/Remove items
              </Option>
              <Option value="Wrong size">Wrong Size</Option>
              <Option value="Wrong Color">Wrong Color</Option>
              <Option value="Other Reasons">Other Reasons</Option>
            </Select>
          )}
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
            loading={pending ? true : false}
          >
            Cancel Order
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default CancelOrder;
