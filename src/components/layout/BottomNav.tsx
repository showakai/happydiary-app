import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const [value, setValue] = useState(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/all") {
      return 1;
    } else if (currentPath === "/chart") {
      return 2;
    } else {
      return 0;
    }
  });
  const navigate = useNavigate();
  const paths = ["/", "/all", "/chart"];

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(paths[newValue]);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "var(--bottomNavH)",
        zIndex: 100,
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
        showLabels={true}
      >
        <BottomNavigationAction label="New" icon={<AddIcon />} />
        <BottomNavigationAction label="All" icon={<EmojiEmotionsIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
