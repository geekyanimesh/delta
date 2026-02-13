import axios from "axios";

// 1. Create a configured Axios instance
const api = axios.create({
  baseURL: "import.meta.env.VITE_API_URL", // Adjust port if needed
});

// 2. Helper to attach the token to every request
// We don't use a global interceptor here to keep it simple for now.
// You will pass the token from your React components.

export const checkAuthStatus = async (token: string) => {
  const res = await api.get("/user/auth-status", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  return res.data;
};

export const sendChatRequest = async (message: string, token: string) => {
  const res = await api.post(
    "/chat/new",
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  return res.data;
};

export const getUserChats = async (token: string) => {
  const res = await api.get("/chat/all-chats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) {
    throw new Error("Unable to fetch chats");
  }
  return res.data;
};

export const deleteUserChats = async (token: string) => {
  const res = await api.delete("/chat/delete", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  return res.data;
};