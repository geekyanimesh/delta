import axios from "axios";

export const sendChatRequest = async (message: string) => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/chat/new", 
    { message }, 
    { withCredentials: true } // Include cookies (token)
  );
  
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }

  return res.data;
};
