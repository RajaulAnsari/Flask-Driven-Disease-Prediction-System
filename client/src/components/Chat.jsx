import React, { useState } from "react";
import ChatButton from "./ChatButton";

function Chat() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="App">
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 14px",
          borderRadius: "50%",
          backgroundColor: "#ff1285",
          fontSize: "24px",
          border: "none",
          cursor: "pointer",
          zIndex: 999,
        }}
        onClick={() => setChatOpen(!chatOpen)}
      >
        💬
      </button>
      <ChatButton isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

export default Chat;
