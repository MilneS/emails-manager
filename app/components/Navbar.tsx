"use client";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootSate } from "@/appStore/store";
import AlertMessage from "./AlertMessage";
import { User } from "@/appStore/interface/interface.model";
import { getUser } from "@/services/user";
import { setIsLoggedIn, setUserData } from "@/appStore/authSlice";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const isLoggedIn: boolean = useSelector(
    (state: RootSate) => state.authReducer.isLoggedIn
  );
  const saveTemplateMessage = useSelector(
    (state: RootSate) => state.cardsReducer.saveTemplateMessage
  );
  const dispatch = useDispatch();

  const navItems = ["My emails", isLoggedIn ? "Logout" : "Login"];
  const navItemsLinks = {
    myEmails: "/my-emails",
    login: "/login",
    logout: "/login",
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const savedLoginToken = async () => {
    const token = document?.cookie?.split("=")[1];
    const tokenEmail = token?.split(":")[0];
    const user: User = await getUser(tokenEmail);
    if (user && user.token === token) {
      dispatch(setUserData({ ...user, token }));
      dispatch(setIsLoggedIn(true));
    }
  };

  useEffect(() => {
    savedLoginToken();
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link href="/">
        <Typography variant="h6" sx={{ my: 2 }}>
          Home
        </Typography>
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const navigateToItemLink = (item: string) => {
    console.log(item);

    const itemLink =
      navItemsLinks[
        item === "My emails"
          ? 'myEmails'
          : (item.toLocaleLowerCase() as keyof typeof navItemsLinks)
      ];
    router.push(`${itemLink}`);
  };

  const logout = () => {
    dispatch(setIsLoggedIn(!isLoggedIn));
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00";
  };

  const selectedItem = (item: string) => {
    console.log(item);

    if (item === "Logout") {
      logout();
    } else {
      navigateToItemLink(item);
    }
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box position="relative" display="flex">
      <CssBaseline />
      {saveTemplateMessage && <AlertMessage message={saveTemplateMessage} />}
      <AppBar component="nav" sx={{ height: "4rem", zIndex: 80 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <IconButton
              color="inherit"
              aria-label="home"
              onClick={() => router.push("/")}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => selectedItem(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 4 }}></Box>
    </Box>
  );
}
