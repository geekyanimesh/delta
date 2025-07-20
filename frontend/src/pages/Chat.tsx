// frontend/src/pages/Chat.tsx
import { useRef, useState } from "react";
import { sendChatRequest } from "../helpers/api";
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

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
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response";
      setMessages((prev) => [...prev, { role: "model", content: aiText }]);
    } catch (err) {
      console.error("❌ Error fetching AI response:", err);
      setMessages((prev) => [...prev, { role: "model", content: "Error occurred." }]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 2, bgcolor: "#121212", color: "#fff" }}>
        <Typography variant="h4" gutterBottom color="white">
          Chat
        </Typography>

        <List sx={{ maxHeight: 400, overflow: "auto" }}>
          {messages.map((msg, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={msg.content}
                secondary={msg.role === "user" ? "You" : "AI"}
                primaryTypographyProps={{
                  color: "#fff",
                }}
                secondaryTypographyProps={{
                  color: "#bbb",
                }}
                sx={{
                  textAlign: msg.role === "user" ? "right" : "left",
                  backgroundColor: msg.role === "user" ? "#1e88e5" : "#424242",
                  p: 1.5,
                  borderRadius: 2,
                  color: "#fff",
                }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", mt: 2 }}>
          <TextField
            fullWidth
            inputRef={inputRef}
            label="Type your message"
            variant="filled"
            InputProps={{
              sx: {
                backgroundColor: "#333",
                color: "#fff",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#aaa",
              },
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            variant="contained"
            sx={{ ml: 1, bgcolor: "#1e88e5", color: "#fff" }}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
