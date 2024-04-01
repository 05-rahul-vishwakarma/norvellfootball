// components/OlarkChat.js
import { useEffect } from "react";

const OlarkChat = () => {
  // <script
  //         src="//code.tidio.co/vxwslfiqavslfshkzjnnixbjimwewctv.js"
  //         async
  //       ></script>
  useEffect(() => {
    // if (!window.olark) {
    // Ensure Olark is not already loaded
    const script = document.createElement("script");
    script.async = true;
    script.src = "//code.tidio.co/vxwslfiqavslfshkzjnnixbjimwewctv.js";
    document.body.appendChild(script);

    // }
    return () => {
      document.querySelector("#tidio-chat")?.remove();
    };
  }, []);

  return null; // Olark chat is loaded dynamically, so this component doesn't need to render anything
};

export default OlarkChat;
