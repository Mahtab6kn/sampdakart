import Heading from "@/components/ui/heading/Heading";
import { Button, Dialog, IconButton, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const EditAddress = ({ open, setOpen, data, setData }) => {
  const handleOpen = () => setOpen(!open);
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(formData);
    handleOpen();
  };

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
        title={"Edit Address"}
        buttons={[
          <IconButton key={1} variant="text" onClick={handleOpen}>
            <RxCross1 size={20} />
          </IconButton>,
        ]}
      />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <Input
          label="Flat/HouseNo."
          name="flat"
          value={formData.flat}
          onChange={handleChange}
        />
        <Input
          label="Street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        <Input
          label="Landmark"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
        />
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <Input
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
      </form>
      <div className="flex justify-end items-center gap-4">
        <Button variant="outlined" color="blue" onClick={handleOpen}>
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="blue"
          type="submit"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </div>
    </Dialog>
  );
};

export default EditAddress;
