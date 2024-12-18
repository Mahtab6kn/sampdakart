"use client";
import {
  Button,
  Dialog,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import TextEditor from "@/components/layout/blogs/TextEditor";
import Heading from "@/components/ui/heading/Heading";
import { FaMicroblog } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import HTMLReactParser from "html-react-parser";

const TextEditorDialog = ({ open, setOpen, formData, setFormData }) => {
  const handleOpen = () => setOpen(!open);

  const handleSubmit = () => {
    handleOpen();
  };

  return (
    <Dialog
      open={open}
      size="xl"
      animate={{
        mount: { scale: 1 },
        unmount: { scale: 0 },
      }}
      className="max-h-[90vh] p-2 overflow-scroll"
    >
      <Heading
        icon={
          <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
            <FaMicroblog size={20} color="white" />
          </div>
        }
        title={"Text Editor"}
        buttons={[
          <IconButton key={1} variant="text" onClick={handleOpen}>
            <RxCross1 size={20} />
          </IconButton>,
        ]}
      />
      <div className="mt-3">
        <TextEditor formData={formData} setFormData={setFormData} />
      </div>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleSubmit}
          className="py-2"
        >
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default TextEditorDialog;
