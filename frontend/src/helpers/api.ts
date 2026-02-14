import axios from "axios";

export const sendChatRequest = async (message: string) => {
  const res = await axios.post(
    "import.meta.env.VITE_API_URL", 
    { message }, 
    { withCredentials: true } // Include cookies (token)
  );
  
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }

  return res.data;
};
