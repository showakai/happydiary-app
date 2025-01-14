import { Box } from "@mui/material";
import ImputText from "../ImputText";
import { DailyContents } from "../../types/types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Top = () => {
  const saveNewContent = async (newContent: DailyContents) => {
    const docRef = await addDoc(collection(db, "Diary"), newContent);
    console.log(docRef);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "var(--topH)",
      }}
    >
      <ImputText saveNewContent={saveNewContent} />
    </Box>
  );
};

export default Top;
