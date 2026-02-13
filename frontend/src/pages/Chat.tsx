import {
  Box,
  Container,
  IconButton,
  InputBase,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
  CircularProgress,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useLayoutEffect(() => {
    if (user) {
      const loadChats = async () => {
        const toastId = "loadchats";
        toast.loading("Loading Chats", { id: toastId });
        try {
          const token = await getToken();
          const res = await axios.get("/chat/all-chats", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (res.data.chats) {
            setMessages(res.data.chats);
          }
          toast.success("Successfully loaded chats", { id: toastId });
        } catch (err) {
          console.error(err);
          toast.error("Loading Failed", { id: toastId });
        }
      };
      loadChats();
    }
  }, [user, getToken]);

  const handleSend = async () => {
    const message = inputRef.current?.value?.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    if (inputRef.current) inputRef.current.value = "";
    setLoading(true);

    try {
      const token = await getToken();
      const res = await axios.post(
        "/chat/new",
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // UPDATED: Handle full chat history or single message response
      if (res.data.chats) {
        setMessages(res.data.chats);
      } else {
        const aiText = res.data.message || res.data.content || "No response";
        setMessages((prev) => [...prev, { role: "model", content: aiText }]);
      }
    } catch (err) {
      console.error("Error fetching AI response:", err);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletechats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      const token = await getToken();
      await axios.delete("/chat/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages([]);
      toast.success("Chats Deleted!", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete", { id: "deletechats" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#120f18", color: "text.primary", display: "flex", flexDirection: "column" }}>
        <Container maxWidth={false} sx={{ flex: 1, py: 1, px: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4" fontWeight={600} fontFamily={"Inter,sans-serif"}>
              What's today's agenda?
            </Typography>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeletechats} sx={{ textTransform: "none", borderColor: "#ff1744", color: "#ff1744" }}>
              Delete Chats
            </Button>
          </Box>

          <Box sx={{ height: "70vh", overflowY: "auto", borderRadius: 2, p: 2, bgcolor: "#1f1f1f", mb: 2, boxShadow: "inset 0 0 10px #00000080" }}>
            {messages.map((msg, idx) => (
              <Box key={idx} sx={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", mb: 1.5 }}>
                <Paper elevation={3} sx={{ px: 2, py: 1, bgcolor: msg.role === "user" ? "#2979ff" : "#333", color: "#fff", maxWidth: "75%", borderRadius: "15px", borderTopRightRadius: msg.role === "user" ? 0 : "15px", borderTopLeftRadius: msg.role === "user" ? "15px" : 0 }}>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </Typography>
                </Paper>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2" color="gray">Thinking...</Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Paper component="form" onSubmit={(e) => { e.preventDefault(); handleSend(); }} sx={{ display: "flex", alignItems: "center", bgcolor: "#2a2a2a", px: 3, py: 1, borderRadius: "10px", width: "100%" }}>
            <InputBase inputRef={inputRef} sx={{ flex: 1, color: "#fff" }} placeholder="Type your message…" fullWidth />
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