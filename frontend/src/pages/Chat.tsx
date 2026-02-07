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

// Theme Configuration
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
  
  // State
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Clerk Hooks
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1. LOAD CHATS (On Mount)
  useLayoutEffect(() => {
    if (user) {
      const loadChats = async () => {
        toast.loading("Loading Chats", { id: "loadchats" });
        try {
          const token = await getToken();
          const res = await axios.get("/chat/all-chats", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          setMessages(res.data.chats);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        } catch (err) {
          console.error(err);
          toast.error("Loading Failed", { id: "loadchats" });
        }
      };
      loadChats();
    }
  }, [user, getToken]);

  // 2. SEND MESSAGE
  const handleSend = async () => {
    const message = inputRef.current?.value?.trim();
    if (!message) return;

    // Optimistic UI Update
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    inputRef.current!.value = "";
    setLoading(true);

    try {
      const token = await getToken();
      
      // Send to Backend with Token
      const res = await axios.post(
        "/chat/new",
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiText = res.data.message || "No response";
      setMessages((prev) => [...prev, { role: "model", content: aiText }]);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setMessages((prev) => [...prev, { role: "model", content: "Error occurred." }]);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE CHATS
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
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#120f18",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth={false} sx={{ flex: 1, py: 1, px: 2 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              fontFamily={"Inter,sans-serif"}
            >
              What's today's agenda?
            </Typography>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeletechats}
              sx={{
                textTransform: "none",
                borderColor: "#ff1744",
                color: "#ff1744",
                "&:hover": {
                  backgroundColor: "#2b1a1a",
                  borderColor: "#ff1744",
                },
              }}
            >
              Delete Chats
            </Button>
          </Box>

          {/* Chat Area */}
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
                    maxWidth: "75%",
                    borderRadius: "15px",
                    borderTopRightRadius: msg.role === "user" ? 0 : "15px",
                    borderTopLeftRadius: msg.role === "user" ? "15px" : 0,
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </Typography>
                </Paper>
              </Box>
            ))}

            {loading && (
              <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2" color="gray">
                  Thinking...
                </Typography>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
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
              width: "100%",
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