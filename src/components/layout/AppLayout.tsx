import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";
import BottomNav from "./BottomNav";
// import ListIcon from '@mui/icons-material/List';

const AppLayout = () => {
  //   const drawerWidth = 240;

  //   const [mobileOpen, setMobileOpen] = useState(false);
  //   const [isClosing, setIsClosing] = useState(false);

  //   const handleDrawerClose = () => {
  //     setIsClosing(true);
  //     setMobileOpen(false);
  //   };

  //   const handleDrawerTransitionEnd = () => {
  //     setIsClosing(false);
  //   };

  //   const handleDrawerToggle = () => {
  //     if (!isClosing) {
  //       setMobileOpen(!mobileOpen);
  //     }
  //   };

  return (
    <>
      <ScrollRestoration />
      <AppBar
        position="fixed"
        sx={{
          height: "var(--headerH)",
          boxShadow: "none",
          background: (theme) => theme.palette.bgColor.main,
        }}
      >
        <Toolbar>
          <Typography variant="h5" noWrap color="secondary" component="div">
            iikoto
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.bgColor.main,
          height: "auto",
        }}
      >
        <CssBaseline />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: "var(--headerH)",
            p: {
              xs: 1,
              sm: 3,
            },
            pb: 15,
            pt: 0,
            width: "100%",
            height: "auto",
          }}
        >
          <Outlet />
          <BottomNav />
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
