import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chatService } from '../services/chatService';
import MainNav from '../components/MainNav';

interface ChatMessage {
  text: string;
  isUser: boolean;
}

const LifePoints: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: 'Hallo!  Erzähle mir, was du für die Umwelt getan 😊', isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessages = [
      ...messages,
      { text: inputMessage, isUser: true }
    ];
    setMessages(newMessages);
    
    try {
      const response = await chatService.sendMessage(inputMessage);
      setMessages([
        ...newMessages,
        { text: `Punkte: ${response.score}\n\n${response.scoreReason}`, isUser: false }
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { text: 'Es gab einen Fehler beim Senden der Nachricht.', isUser: false }
      ]);
    }
    
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex justify-center items-center p-5">
      <div className="w-full max-w-[600px] bg-white/85 p-8 rounded-xl shadow-lg">
        <MainNav />

        <div className="text-xl font-bold text-red-700 mb-5 text-center">Deine aktuelle Punktzahl: 150</div>
        <div className="text-xl text-red-700 mb-5 text-center">Du kannst deine Aktion ganz einfach beschreiben  und wir vergeben Punkte in Relation zu dem Effekt auf die Umwelt.</div>

        <div className="flex flex-col items-center mt-4">
          <div 
            ref={chatBoxRef}
            className="w-full h-[300px] overflow-y-auto bg-black/5 rounded-lg p-2.5 mb-2.5 text-left"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] mb-1.5 ${
                  msg.isUser
                    ? 'ml-auto bg-red-700 text-white text-right'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Schreibe eine Nachricht..."
            className="w-full p-2.5 text-base border-2 border-red-700 rounded-lg mb-2.5"
          />
          
          <button
            onClick={sendMessage}
            className="w-full p-3 text-base text-white bg-red-700 border-none rounded-lg cursor-pointer hover:bg-red-800 transition-colors mb-5"
          >
            Senden
          </button>

          <div className="mt-5">
            <input
              type="file"
              id="fileInput"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="inline-block p-2.5 bg-red-700 text-white text-base rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
            >
              Bild hochladen
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifePoints;