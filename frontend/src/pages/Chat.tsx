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
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "../components/Header";

// GT-Standard alternative: Using 'Outfit' or 'Geist' (Inter as fallback)
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#050505",
      paper: "#111111",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a1a1aa",
    },
  },
  typography: {
    // 'Outfit' is a very close free alternative to GT Walsheim/Standard
    fontFamily: "'Outfit', 'Geist', 'Inter', sans-serif",
  },
});

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ position: "relative", my: 2, borderRadius: "12px", overflow: "hidden", border: "1px solid #27272a" }}>
      <Tooltip title={copied ? "Copied!" : "Copy Code"}>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: copied ? "#3b82f6" : "#71717a",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
            zIndex: 10,
          }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        PreTag="div"
        customStyle={{ background: "#000", padding: "1.5rem", margin: 0, fontSize: "0.9rem" }}
      >
        {value}
      </SyntaxHighlighter>
    </Box>
  );
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  useLayoutEffect(() => {
    if (user) {
      const loadChats = async () => {
        const tid = "loadchats";
        toast.loading("Syncing...", { id: tid });
        try {
          const token = await getToken();
          const res = await axios.get("/chat/all-chats", { headers: { Authorization: `Bearer ${token}` } });
          if (res.data.chats) setMessages(res.data.chats);
          toast.success("Ready", { id: tid });
        } catch (err) {
          toast.error("Failed to load history", { id: tid });
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
      const res = await axios.post("/chat/new", { message }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.chats) setMessages(res.data.chats);
    } catch (err) {
      toast.error("Message failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletechats = async () => {
    try {
      toast.loading("Clearing...", { id: "del" });
      const token = await getToken();
      await axios.delete("/chat/delete", { headers: { Authorization: `Bearer ${token}` } });
      setMessages([]);
      toast.success("Cleared", { id: "del" });
    } catch (err) {
      toast.error("Failed to clear", { id: "del" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
        <Header />
        
        <Container maxWidth="md" sx={{ flex: 1, display: "flex", flexDirection: "column", pt: "90px", pb: "100px" }}>
          
          {/* TOP RIGHT CLEAR BUTTON */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button 
              size="small" 
              variant="text"
              startIcon={<DeleteIcon sx={{ fontSize: 16 }} />} 
              onClick={handleDeletechats}
              sx={{ 
                color: "#71717a", 
                textTransform: "none", 
                fontSize: "0.8rem",
                borderRadius: "8px",
                "&:hover": { color: "#ff4444", bgcolor: "rgba(255, 68, 68, 0.05)" } 
              }}
            >
              Clear History
            </Button>
          </Box>

          {/* Messages Area */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {messages.length === 0 && !loading && (
              <Box sx={{ mt: 15, textAlign: "center" }}>
                <Typography 
                  variant="h3" 
                  fontWeight={600} 
                  sx={{ 
                    mb: 1.5, 
                    color: "#ffffff",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    letterSpacing: "-1.5px"
                  }}
                >
                  How can I help you?
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem", opacity: 0.6 }}>
                  Ask about anything.
                </Typography>
              </Box>
            )}

            {messages.map((msg, idx) => (
              <Box key={idx} sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-end" : "flex-start", 
                mb: 5 
              }}>
                <Typography variant="caption" sx={{ mb: 1, color: "text.secondary", fontWeight: 700, letterSpacing: "1px", opacity: 0.5 }}>
                  {msg.role === "user" ? "YOU" : "DELTA AI"}
                </Typography>
                <Paper elevation={0} sx={{ 
                    px: 0, // No padding on AI paper for cleaner look
                    py: 0,
                    bgcolor: "transparent", 
                    color: "#fff", 
                    maxWidth: "95%", 
                    width: "100%",
                    borderRadius: "0",
                }}>
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} />
                        ) : (
                          <code className={className} {...props} style={{ background: "#27272a", padding: "3px 6px", borderRadius: "6px", fontSize: "0.9em" }}>
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#e4e4e7", fontSize: "1.05rem" }}>{children}</Typography>
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </Paper>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                <CircularProgress size={14} sx={{ color: "#3b82f6" }} />
                <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic", opacity: 0.7 }}>Thinking...</Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Fixed Input Area */}
          <Box sx={{ 
            position: "fixed", 
            bottom: 0, 
            left: 0, 
            width: "100%", 
            bgcolor: "rgba(5,5,5,0.7)", 
            backdropFilter: "blur(20px)",
            pt: 2, pb: 5
          }}>
            <Container maxWidth="md">
              <Paper 
                component="form" 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  bgcolor: "#111", 
                  px: 2.5, py: 1.2, 
                  borderRadius: "20px", 
                  border: "1px solid #27272a",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  "&:focus-within": { borderColor: "#3b82f6", boxShadow: "0 0 20px rgba(59, 130, 246, 0.15)" }
                }}
              >
                <InputBase 
                  inputRef={inputRef} 
                  sx={{ flex: 1, color: "#fff", fontSize: "1.05rem", ml: 1 }} 
                  placeholder="Ask Delta..." 
                  fullWidth 
                />
                <IconButton type="submit" sx={{ color: "#3b82f6", transition: "transform 0.2s", "&:hover": { transform: "scale(1.1)" } }}>
                  <SendIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Container>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;