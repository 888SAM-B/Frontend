import React, { useEffect } from "react";

const ZapierChatbot = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.src =
      "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
      

    // Append the script to the document head
    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Zapier Chatbot Embed */}
      <zapier-interfaces-chatbot-embed
        is-popup="true"
        chatbot-id="cmd8zb8yr0009rhyjzp4r92xc"
        
      ></zapier-interfaces-chatbot-embed>
    </div>
  );
};

export default ZapierChatbot;
