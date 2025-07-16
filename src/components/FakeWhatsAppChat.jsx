import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Send, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import html2canvas from "html2canvas-pro";

export default function FakeWhatsAppChat() {
  const [name, setName] = useState("user name");
  const [profilePic, setProfilePic] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState("user");

  const addMessage = () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([...messages, { text: input, sender, time }]);
    setInput("");
  };

  const handleDownload = async () => {
    const chat = document.getElementById("chat-container");
    if (!chat) return;
    const canvas = await html2canvas(chat);
    const link = document.createElement("a");
    link.download = "fake-whatsapp-chat.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Fake WhatsApp Chat Generator</h1>

      <Card className="mb-4">
        <CardContent className="flex flex-col gap-2 p-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
          <Input
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder="Profile Picture URL (optional)"
          />
        </CardContent>
      </Card>

      {/* Chat container including header and messages */}
      <div id="chat-container" className="rounded-lg overflow-hidden border border-gray-300">
        {/* WhatsApp Header with icons */}
        <div className="flex items-center justify-between p-2 bg-green-600 text-white">
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 cursor-pointer" />
            {profilePic ? (
              <img src={profilePic} alt="profile" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                {name[0] || "?"}
              </div>
            )}
            <div>
              <div className="font-semibold leading-tight">{name || "User"}</div>
              <div className="text-xs text-white/80 leading-none">online</div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Video className="w-5 h-5 cursor-pointer" />
            <Phone className="w-5 h-5 cursor-pointer" />
            <MoreVertical className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Chat area */}
        <div id="chat-area" className="bg-green-50 p-4 space-y-2 min-h-[200px] flex flex-col">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`inline-block px-3 py-2 rounded-xl text-sm whitespace-pre-wrap break-words ${
                msg.sender === "user"
                  ? "bg-green-200 ml-auto text-right self-end"
                  : "bg-white text-left self-start"
              }`}
            >
              <>
                <div>{msg.text}</div>
                <div className="text-[10px] text-gray-500 mt-1">{msg.time}</div>
              </>
            </div>
          ))}
        </div>
      </div>

      {/* Sender toggle */}
      <div className="flex justify-center gap-4 mt-4">
  <Button
    className={`px-4 py-2 rounded ${sender === "user"
      ? "bg-[#25D366] text-white"
      : "bg-white text-black border border-[#25D366]"}`}
    onClick={() => setSender("user")}
  >
    You
  </Button>
  <Button
    className={`px-4 py-2 rounded ${sender === "bot"
      ? "bg-[#25D366] text-white"
      : "bg-white text-black border border-[#25D366]"}`}
    onClick={() => setSender("bot")}
  >
    Receiver
  </Button>
</div>  

      <div className="flex mt-4 gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          rows={2}
        />
        <Button onClick={addMessage} className="shrink-0" title="Send">
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <Button onClick={handleDownload} variant="outline" className="mt-4 w-full text-white">
        <Download className="w-4 h-4 mr-2" /> Download Image
      </Button>
    </div>
  );
}
