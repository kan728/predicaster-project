import React, { useEffect, useState } from 'react';

function Chatbot() {
  const [scriptError, setScriptError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("chatbotId", "zHR1lCxAUltiaKPMp7BTz");
    script.setAttribute("domain", "www.chatbase.co");

    const loadScript = () => {
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Script loaded successfully.");
      };
      script.onerror = (error) => {
        console.error("Error loading script:", error);
        setScriptError(error);
      };
    };
    const timeoutId = setTimeout(loadScript, 500);
    return () => {
      clearTimeout(timeoutId);
      // document.body.removeChild(script);
    };
  }, []);

  if (scriptError) {
    return <div>Error loading chatbot script. Please try again later.</div>;
  }

  return (
    <>
    </>
  );
}

export default Chatbot;