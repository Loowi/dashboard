import {
  createTheme,
  Paper,
  TextField,
  Typography,
  Box,
  InputBase,
  IconButton,
  Button,
  Stack,
  Card,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import theme from "../../config/theme";
import style from "./chatBot.module.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import { FixedSizeList } from "react-window";

const innerTheme = createTheme({
  ...theme,
  palette: {
    mode: "light",
  },
});

const ChatBot = ({ onClose }) => {
  const [input, setInput] = useState("");
  const listRef = useRef(null);
  const [messages, setMessages] = useState([{ message: "Hello, How can I help you,", agent: true }]);
  const [startChat, setStartChat] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = () => {
    setInput("");
    setMessages([...messages, { message: input, agent: false }]);
  };

  const handleStartChat = () => {
    setStartChat(true);
  };

  useEffect(() => {
    listRef.current?.scrollToItem(messages.length + 1, "end");
  }, [messages]);

  const renderMessage = ({ index, style }) => {
    return (
      <div style={style}>
        {messages[index].agent ? (
          <Box display="flex" alignContent="flex-end" justifyContent="flex-start" mb={1}>
            <Box bgcolor="#fff" color="#000" p={1} borderRadius={2}>
              <Typography variant="body2">{messages[index].message}</Typography>
            </Box>
          </Box>
        ) : (
          <Box display="flex" alignContent="flex-end" justifyContent="flex-end" mb={1}>
            <Box bgcolor="#1876D1" color="#fff" p={1} borderRadius={2}>
              <Typography variant="body2">{messages[index].message}</Typography>
            </Box>
          </Box>
        )}
      </div>
    );
  };
  return (
    <ThemeProvider theme={innerTheme}>
      <Paper className={style.wrapper}>
        <Box bgcolor="#fff" p={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Hello, may I help you</Typography>
          <IconButton onClick={onClose}>
            <CancelIcon />
          </IconButton>
        </Box>
        <Box p={1}>
          {!startChat && (
            <Card sx={{ p: 2, maxWidth: 300, m: "20px auto" }}>
              <Stack spacing={2}>
                <Typography variant="body2">
                  Welcome to our Live Chat. please fill in the form below before stating the chat
                </Typography>
                <TextField label="Name" fullWidth size="small" />
                <TextField label="Email" fullWidth size="small" />
                <Button onClick={handleStartChat} fullWidth sx={{ textTransform: "none" }}>
                  Start the chat
                </Button>
              </Stack>
            </Card>
          )}
          {startChat && (
            <Box p={2}>
              <FixedSizeList
                className={style.list}
                height={300}
                itemSize={50}
                itemCount={messages.length}
                overscanCount={15}
                ref={listRef}
              >
                {renderMessage}
              </FixedSizeList>

              <Box bgcolor="#fff" borderRadius={2} p="5px 10px 5px 15px" display="flex" mt={2}>
                <InputBase
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type yout message"
                  sx={{ width: "100%" }}
                  onKeyDown={(e) => e.key === "Enter" && input !== "" && handleSendMessage()}
                />
                <IconButton onClick={handleSendMessage} disabled={input === ""}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ChatBot;
