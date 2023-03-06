import { useState } from "react";
import { ImportGambarIcon, KirimIcon } from "../../utility/icon/icon";

function ChatInput({ onSendMessage, onChange, value }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (message.trim()) {
    //   onSendMessage(message.trim());
    //   setMessage("");
    // }
  };

  return (
    <div className="flex items-center">
      <label htmlFor="gambar" className="p-2 rounded-full bg-white">
        <ImportGambarIcon />
      </label>
      <input type={"file"} className="hidden" id="gambar" />
      <input
        type="text"
        placeholder="Ketik Pesan Anda"
        className="flex-1 w-[440px] border rounded-full py-2 px-4 mx-4 outline-none"
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="bg-white text-white rounded-full p-2 hover:bg-slate-100 outline-none"
      >
        <div onClick={onSendMessage}>
          <KirimIcon />
        </div>
      </button>
    </div>
  );
}

export default ChatInput;
