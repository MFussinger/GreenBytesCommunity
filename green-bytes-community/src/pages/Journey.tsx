import React, { useState, useRef, useEffect } from 'react';
import MainNav from '../components/MainNav';

interface ChatMessage {
  text: string;
  isUser: boolean;
}

const Journey: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: 'Willkommen zu deiner Reise! Ich bin dein Guide. Wie kann ich dir helfen?', isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto-scroll zum neuesten Nachricht
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessages = [
      ...messages,
      { text: inputMessage, isUser: true }
    ];
    setMessages(newMessages);

    // Simulierte Bot-Antwort (später durch echte API ersetzen)
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: 'Das ist eine automatische Antwort. Später wird hier die echte Story-Engine antworten.', isUser: false }
      ]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex items-center justify-center p-5">
      <div className="w-full max-w-[600px] bg-white/85 p-8 rounded-xl shadow-lg">
        <MainNav />
        
        <div className="text-xl font-bold text-red-700 mb-5 text-center">
          Deine aktuelle Punktzahl: 150
        </div>

        <div className="flex flex-col items-center">
          <div 
            ref={chatBoxRef}
            className="w-full h-[300px] overflow-y-auto bg-black/5 rounded-lg p-4 mb-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] mb-2 ${
                  msg.isUser
                    ? 'ml-auto bg-red-700 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="w-full flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Schreibe eine Nachricht..."
              className="flex-1 p-3 text-base border-2 border-red-700 rounded-lg"
            />
            
            <button
              onClick={sendMessage}
              className="px-6 py-3 text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors"
            >
              Senden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;