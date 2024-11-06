import Heading from "@/components/ui/heading/Heading";
import { Button, Dialog, IconButton, Input } from "@material-tailwind/react";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const AddressCreate = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, x: 0 },
        unmount: { scale: 0, x: 600 },
      }}
      className="p-6"
    >
      <Heading
        icon={
          <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
            <FaRegAddressCard size={20} color="white" />
          </div>
        }
        title={"Create Address"}
        buttons={[
          <IconButton key={1} variant="text" onClick={handleOpen}>
            <RxCross1 size={20} />
          </IconButton>,
        ]}
      />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <Input label="Flat/HouseNo." />
        <Input label="Street" />
        <Input label="Landmark" />
        <Input label="City" />
        <Input label="State" />
        <Input label="Pincode" />
      </form>
      <div className="flex justify-end items-center gap-4">
        <Button variant="outlined" color="blue" onClick={handleOpen}>
          Cancel
        </Button>
        <Button variant="gradient" color="blue" type="submit">
          Create
        </Button>
      </div>
    </Dialog>
  );
};

export default AddressCreate;
