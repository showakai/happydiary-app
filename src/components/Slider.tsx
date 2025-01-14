import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
// import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function ValueSlider() {
  //   const [sliderValue, setSliderValue] = useState<number>(50);
  const { category, setCategory } = useAppContext();
  console.log(category);

  const handleSliderValue = (
    _: Event | React.SyntheticEvent,
    v: number | number[]
  ) => {
    if (typeof v === "number") {
      if (v < 30) {
        setCategory("ちょっと良い");
      } else if (v >= 30 && v < 80) {
        setCategory("良い");
      } else {
        setCategory("最高");
      }
    }
  };
  const marks = [
    {
      value: 10,
      label: "少し",
    },
    {
      value: 50,
      label: "良い",
    },
    {
      value: 100,
      label: "最高",
    },
  ];
  return (
    <Box sx={{ width: 300, textAlign: "center" }}>
      <Slider
        marks={marks}
        size="medium"
        defaultValue={0}
        aria-label="happyValue"
        min={10}
        max={100}
        step={10}
        valueLabelDisplay="auto"
        onChangeCommitted={handleSliderValue}
        sx={{
          textAlign: "center",
          width: "80%",
          "& .MuiSlider-markLabel": {
            fontSize: "12px", // サイズ変更
            color: "#777",
          },
        }}
      />
    </Box>
  );
}
