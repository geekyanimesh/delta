import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat with Delta",
        1000,
        "Powered by Gemini-2.5",
        2000,
        "Experience the Power of AI",
        1500,
        "Your custom AI chatApp",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        fontFamily:"Inter,sans-serif",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;