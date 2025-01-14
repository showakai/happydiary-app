import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DailyContents } from "../types/types";
import { Timestamp } from "firebase/firestore";
import ValueSlider from "./Slider";
import { useAppContext } from "../context/AppContext";

interface InputTextProps {
  saveNewContent: (newContent: DailyContents) => void;
}

const ImputText = ({ saveNewContent }: InputTextProps) => {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const [saveText, setSaveText] = useState(false);
  const { category } = useAppContext();

  const handleBlur = () => {
    setError(inputText.trim() === "");
  };

  const onClickSave = () => {
    const newContent = {
      content: inputText,
      date: Timestamp.now(),
      id: String(Math.random() * 100),
      category: category,
    };
    saveNewContent(newContent);
    setInputText("");
    setSaveText(true);
    setTimeout(() => {
      setSaveText(false);
    }, 2000);
  };

  return (
    <Box
      component="form"
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography sx={{ color: (theme) => theme.palette.basefontColor.main }}>
          今日のいいこと
        </Typography>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
            },
            width: { xs: "80vw", md: "400px" },
            backgroundColor: "white",
            borderRadius: "16px",
            "&:hover": {
              border: "none",
            },
          }}
          multiline
          rows={4}
          fullWidth
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          onBlur={handleBlur}
          placeholder="綺麗な月を見た"
          error={error}
          helperText={error ? "内容を入力してください" : ""}
        ></TextField>
        <ValueSlider />
        <Button
          sx={{
            backgroundColor: (theme) => theme.palette.pink.main,
            width: "70%",
            color: "white",
            paddingBlock: "10px",
            border: "none",
            borderRadius: "20px",
          }}
          onClick={onClickSave}
        >
          入力
        </Button>

        <Typography color="pink">{saveText ? "記録しました" : ""}</Typography>
      </Stack>
    </Box>
  );
};

export default ImputText;
