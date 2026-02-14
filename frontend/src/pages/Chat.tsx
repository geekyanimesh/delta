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
    fontFamily: "'Outfit', 'Inter', 'Roboto', sans-serif",
  },
});

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Code copied!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Box 
      sx={{ 
        position: "relative", 
        my: 3, 
        borderRadius: "12px", 
        overflow: "hidden", 
        border: "1px solid #27272a",
        backgroundColor: "#000"
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          px: 2, 
          py: 1, 
          bgcolor: "#1a1a1a",
          borderBottom: "1px solid #27272a"
        }}
      >
        <Typography variant="caption" sx={{ color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>
          {language || "code"}
        </Typography>
        <Tooltip title={copied ? "Copied!" : "Copy Code"}>
          <Button
            onClick={handleCopy}
            size="small"
            startIcon={copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
            sx={{ 
              color: copied ? "#3b82f6" : "#a1a1aa", 
              fontSize: "0.7rem",
              textTransform: "none",
              "&:hover": { color: "#fff" }
            }}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </Tooltip>
      </Box>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        PreTag="div"
        customStyle={{ 
          background: "transparent", 
          padding: "1.5rem", 
          margin: 0, 
          fontSize: "0.85rem",
          lineHeight: "1.5"
        }}
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useLayoutEffect(() => {
    if (user) {
      const loadChats = async () => {
        const tid = "sync-id";
        toast.loading("Syncing with DeltaAI...", { id: tid });
        try {
          const token = await getToken();
          const res = await axios.get("/chat/all-chats", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (res.data.chats) {
            setMessages(res.data.chats);
          }
          toast.success("Ready", { id: tid });
        } catch (err) {
          console.error(err);
          toast.error("Failed to sync history", { id: tid });
        }
      };
      loadChats();
    }
  }, [user, getToken]);

  const handleSend = async () => {
    const message = inputRef.current?.value?.trim();
    if (!message) return;

    if (inputRef.current) inputRef.current.value = "";

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const token = await getToken();
      const res = await axios.post(
        "/chat/new",
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.chats) {
        setMessages(res.data.chats);
      }
    } catch (err) {
      console.error("Chat Error:", err);
      toast.error("Failed to reach DeltaAI");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeletechats = async () => {
    if (!window.confirm("Are you sure you want to clear your entire history?")) return;
    
    try {
      toast.loading("Clearing Chats...", { id: "del-chats" });
      const token = await getToken();
      await axios.delete("/chat/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages([]);
      toast.success("Chats cleared", { id: "del-chats" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete", { id: "del-chats" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
        <Header />

        <Container maxWidth="md" sx={{ flex: 1, display: "flex", flexDirection: "column", pt: "100px", pb: "120px", position: "relative" }}>
          
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Button 
              size="small" 
              variant="text" 
              startIcon={<DeleteIcon sx={{ fontSize: 18 }} />} 
              onClick={handleDeletechats}
              sx={{ color: "#71717a", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", "&:hover": { color: "#ff4444", bgcolor: "transparent" } }}
            >
              Clear History
            </Button>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", px: 1 }}>
            {messages.length === 0 && !loading && (
              <Box sx={{ mt: 12, textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 2, fontSize: { xs: "2.4rem", md: "3.6rem" }, letterSpacing: "-1.5px", color: "#fff" }}>
                  How can I help you?
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem", opacity: 0.6 }}>
                  Let's get started...
                </Typography>
              </Box>
            )}

            {messages.map((msg, idx) => (
              <Box 
                key={idx} 
                sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start", 
                  mb: 6 
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mb: 1.5, 
                    color: "text.secondary", 
                    fontWeight: 800, 
                    letterSpacing: "1.2px", 
                    opacity: 0.4, 
                    textTransform: "uppercase",
                    mr: msg.role === "user" ? 1 : 0,
                    ml: msg.role === "user" ? 0 : 1
                  }}
                >
                  {msg.role === "user" ? "You" : "DeltaAI"}
                </Typography>

                <Paper 
                  elevation={0} 
                  sx={{ 
                    px: msg.role === "user" ? 2.5 : 0, 
                    py: msg.role === "user" ? 2 : 0,
                    bgcolor: msg.role === "user" ? "#161616" : "transparent", 
                    border: msg.role === "user" ? "1px solid #27272a" : "none",
                    color: "#efefef", 
                    maxWidth: "85%", 
                    width: "fit-content",
                    borderRadius: "18px",
                  }}
                >
                  <ReactMarkdown
                    components={{
                      code({ node, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                          <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} />
                        ) : (
                          <code className={className} {...props} style={{ background: "#27272a", padding: "4px 8px", borderRadius: "6px", fontSize: "0.95em", fontFamily: "monospace" }}>
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#e4e4e7", fontSize: "1.1rem", whiteSpace: "pre-wrap" }}>{children}</Typography>,
                      li: ({ children }) => <li style={{ marginBottom: '8px', color: "#e4e4e7", fontSize: "1.1rem" }}>{children}</li>
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </Paper>
              </Box>
            ))}

            {loading && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mt: 3, ml: 1 }}>
                <CircularProgress size={18} thickness={5} sx={{ color: "#3b82f6" }} />
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, fontStyle: "italic", opacity: 0.8 }}>Thinking...</Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%", bgcolor: "rgba(5,5,5,0.85)", backdropFilter: "blur(24px)", pt: 3, pb: 6, zIndex: 10 }}>
            <Container maxWidth="md">
              <Paper 
                component="form" 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                sx={{ 
                  display: "flex", alignItems: "center", bgcolor: "#111", px: 3, py: 1.5, borderRadius: "24px", border: "1px solid #27272a",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.6)", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:focus-within": { borderColor: "#3b82f6", boxShadow: "0 0 30px rgba(59, 130, 246, 0.18)", transform: "translateY(-2px)" }
                }}
              >
                <InputBase 
                  inputRef={inputRef}
                  onKeyDown={handleKeyDown} 
                  sx={{ flex: 1, color: "#fff", fontSize: "1.1rem", ml: 1, "& input::placeholder": { color: "#52525b", opacity: 1 } }} 
                  placeholder="Ask DeltaAI anything..." 
                  fullWidth 
                />
                <IconButton type="submit" disabled={loading} sx={{ color: "#3b82f6", transition: "all 0.2s", "&:hover": { transform: "scale(1.15) rotate(-10deg)" }, "&:disabled": { color: "#27272a" } }}>
                  <SendIcon fontSize="medium" />
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