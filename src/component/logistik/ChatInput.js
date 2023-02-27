import { useState } from "react";
import { ImportGambarIcon, KirimIcon } from "../../utility/icon/icon";

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <label htmlFor="gambar" className="p-2 rounded-full bg-white">
        <ImportGambarIcon />
      </label>
      <input type={"file"} className="hidden" id="gambar" />
      <input type="text" placeholder="Ketik Pesan Anda" className="flex-1 w-[440px] border rounded-full py-2 px-4 mx-4 outline-none" value={message} onChange={(event) => setMessage(event.target.value)} />
      <button type="submit" className="bg-white text-white rounded-full p-2 hover:bg-slate-100 outline-none">
        <KirimIcon />
      </button>
    </form>
  );
}

export default ChatInput;
