import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { NavLink } from "react-router-dom";
import { CSSProperties } from "react";

interface SidebarProps {
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
  mobileOpen: boolean;
  drawerWidth: number;
}

interface MenuItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

const Sidebar = ({
  handleDrawerTransitionEnd,
  handleDrawerClose,
  mobileOpen,
  drawerWidth,
}: SidebarProps) => {
  const menuItem: MenuItem[] = [
    { text: "New iikoto", path: "/", icon: InsertEmoticonIcon },
    { text: "All", path: "/all", icon: DensitySmallIcon },
  ];

  const baseLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  };

  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  };

  const drawer = (
    <div>
      <Toolbar />

      <List>
        {menuItem.map((menu, i) => (
          <NavLink
            to={menu.path}
            key={menu.text}
            style={({ isActive }) => {
              return { ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) };
            }}
          >
            <ListItem key={i}>
              <menu.icon />
              <ListItemText primary={menu.text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            backgroundColor: "primary",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            backgroundColor: "primary",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
