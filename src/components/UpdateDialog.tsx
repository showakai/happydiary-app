import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { DailyContents } from "../types/types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: JSX.Element;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface UpdateType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedContent: DailyContents | undefined;
  onUpdateContent: (
    content: DailyContents,
    updateValue: string
  ) => Promise<void>;
}

const UpdateDialog = ({
  open,
  setOpen,
  selectedContent,
  onUpdateContent,
}: UpdateType) => {
  const [updateValue, setUpdateValue] = useState<string | undefined>("");
  useEffect(() => {
    setUpdateValue(selectedContent?.content);
  }, [selectedContent]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateValue(e.target.value);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            height: "300px",
          },
        }}
      >
        <DialogTitle color="pink" fontSize={16}>
          {"内容の変更"}
        </DialogTitle>
        <DialogContent>
          <TextField
            multiline
            autoFocus
            margin="dense"
            id="update"
            name="update"
            type="text"
            sx={{ height: "200px" }}
            fullWidth
            rows={5}
            variant="outlined"
            value={updateValue}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            キャンセル
          </Button>
          <Button
            color="error"
            onClick={() => {
              onUpdateContent(
                selectedContent as DailyContents,
                updateValue as string
              );
            }}
          >
            変更
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateDialog;
