// src/pages/Chat.tsx
import {
  Box,
  Container,
  IconButton,
  InputBase,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";
import { sendChatRequest } from "../helpers/api";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1f1f1f",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

const Chat = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const handleSend = async () => {
    const message = inputRef.current?.value;
    if (!message) return;
  
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    inputRef.current!.value = "";
  
    try {
      const data = await sendChatRequest(message);
      console.log("📦 Received from backend:", data);
  
      const aiText = data?.message?.trim() || "No response";
  
      setMessages((prev) => [...prev, { role: "model", content: aiText }]);
    } catch (err) {
      console.error("❌ Error fetching AI response:", err);
      setMessages((prev) => [...prev, { role: "model", content: "Error occurred." }]);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#120f18",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="md" sx={{ flex: 1, py: 1 }}>
          <Typography variant="h4" fontWeight={600} mb={2} fontFamily={"Inter,sans-serif"}>
            What's today's agenda?
          </Typography>

          <Box
            sx={{
              height: "70vh",
              overflowY: "auto",
              borderRadius: 2,
              p: 2,
              bgcolor: "#1f1f1f",
              mb: 2,
              boxShadow: "inset 0 0 10px #00000080",
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: msg.role === "user" ? "#2979ff" : "#333",
                    color: "#fff",
                    maxWidth: "100%",
                    borderRadius: "15px",
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          <Paper
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#2a2a2a",
              px: 3,
              py: 1,
              borderRadius: "10px",
            }}
          >
            <InputBase
              inputRef={inputRef}
              sx={{ flex: 1, color: "#fff" }}
              placeholder="Type your message…"
              inputProps={{ "aria-label": "Type a message" }}
              fullWidth
            />
            <IconButton type="submit" sx={{ color: "#ffffff" }}>
              <SendIcon />
            </IconButton>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;
