import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Container,
  Fade,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import style from "./header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import DescriptionIcon from "@mui/icons-material/Description";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ChatBot from "../ChatBot";
const Header = () => {
  const [drawer, setDrawer] = useState(false);

  const [showChatBot, setShowChatBot] = useState(false);

  const toggleDrawer = (open) => {
    setDrawer(open);
  };

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <Box pt={3} pb={3}>
      <Container>
        <AppBar position="static" sx={{ bgcolor: "#036187" }}>
          <Toolbar className={style.toolBar}>
            <div className={style.menuButton}>
              <IconButton aria-label="menu" onClick={() => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </div>
            <Box className={style.title}>
              <Typography sx={{ fontSize: { xs: 12, sm: 16, md: 18 } }} align="left">
                EU Banana Risk Report
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 16 } }} variant="subtitle1" align="left">
                31 December 2021
              </Typography>
            </Box>
            <div className={style.navigationButtons}>
              <Button variant="text" sx={{ textTransform: "none", color: "#AFC942" }}>
                Country-specific statistic
              </Button>
              <Button variant="text" sx={{ textTransform: "none", color: "#fff" }}>
                Item-specific statistic
              </Button>
              <Button variant="text" sx={{ textTransform: "none", color: "#fff" }}>
                Other topics
              </Button>
            </div>
            <div className={style.chatButton}>
              <Button onClick={toggleChatBot} variant="text" sx={{ textTransform: "none", color: "#fff" }}>
                Questions or feedback
              </Button>
            </div>

            <IconButton onClick={toggleChatBot} className={style.chatIcon}>
              <ContactSupportIcon />
            </IconButton>

            <Fade in={showChatBot} appear={false} timeout={100}>
              <div>
                <ChatBot onClose={toggleChatBot} />
              </div>
            </Fade>
          </Toolbar>
        </AppBar>

        <React.Fragment>
          <SwipeableDrawer open={drawer} onClose={() => toggleDrawer(false)}>
            <Box p={2}>
              <Typography variant="h5" align="left">
                EU Banana Risk Report
              </Typography>
            </Box>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary="Country-specific statistic" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary=" Item-specific statistic" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary=" Other topics" />
              </ListItem>
            </List>
          </SwipeableDrawer>
        </React.Fragment>
      </Container>
    </Box>
  );
};

export default Header;
