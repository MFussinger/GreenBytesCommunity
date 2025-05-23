import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainNav from '../components/MainNav';
import { storyService, StoryType, STORY_PROLOGS, InsufficientFundsError } from '../services/storyService';
import { profileService, ProfileResponse } from '../services/profileService';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

interface ChatMessage {
  text: string;
  isUser: boolean;
  options?: string[];
}

const formatText = (text: string): string => {
  text = text.replace(/Wie wird unser Held weitermachen\?$/, '').trim();
  text = text.replace(/\d+\.\s+\*\*(.*?)\*\*/g, '').trim();
  return text;
};

const Journey: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInsufficientFundsAlert, setShowInsufficientFundsAlert] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const fetchProfileData = async () => {
    try {
      const data = await profileService.getProfile();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const getStoryType = (): StoryType => {
    const storyId = searchParams.get('story');
    
    if (!storyId) {
      navigate('/');
      return 'fantasy';
    }

    switch (storyId) {
      case '1':
        return 'fantasy';
      case '2':
        return 'cyberpunk';
      case '3':
        return 'space';
      default:
        navigate('/');
        return 'fantasy';
    }
  };

  useEffect(() => {
    const storyType = getStoryType();
    const storyId = searchParams.get('story');
    
    if (storyId) {
      // Speichere die ausgewählte Story
      localStorage.setItem('selectedStory', storyId);
    }
    
    const prolog = STORY_PROLOGS[storyType];
    
    storyService.resetStory();
    setIsFirstMessage(true);
    setMessages([{ 
      text: prolog,
      isUser: false 
    }]);

    // Initial profile data fetch
    fetchProfileData();
  }, [searchParams]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    const newMessages = [
      ...messages,
      { text: userMessage, isUser: true }
    ];
    setMessages(newMessages);

    try {
      const response = await storyService.sendMessage(
        userMessage,
        isFirstMessage ? getStoryType() : undefined
      );

      setMessages([
        ...newMessages,
        { 
          text: formatText(response.message || ''),
          isUser: false,
          options: response.options 
        }
      ]);

      if (isFirstMessage) {
        setIsFirstMessage(false);
      }

      // Fetch updated profile data after sending message
      await fetchProfileData();
    } catch (error) {
      if (error instanceof InsufficientFundsError) {
        setShowInsufficientFundsAlert(true);
        setMessages(messages);
      } else {
        setMessages([
          ...newMessages,
          { 
            text: 'Es gab einen Fehler beim Senden der Nachricht. Bitte versuche es später erneut.', 
            isUser: false 
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex items-center justify-center p-5">
      <div className="w-full max-w-[800px] bg-white/85 p-8 rounded-xl shadow-lg">
        <MainNav />
        
        <div className="text-xl font-bold text-red-700 mb-5 text-center">
          Deine aktuelle Punktzahl: {profileData?.payableScore || 0}
        </div>

        <div className="flex flex-col items-center">
          <div 
            ref={chatBoxRef}
            className="w-full h-[400px] overflow-y-auto bg-black/5 rounded-lg p-4 mb-4 whitespace-pre-wrap"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.isUser ? 'ml-auto text-right' : ''
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    msg.isUser
                      ? 'bg-red-700 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
                
                {msg.options && !msg.isUser && (
                  <div className="mt-2 space-y-2">
                    {msg.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => {
                          setInputMessage(option);
                          sendMessage();
                        }}
                        className="block w-full text-left p-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-center items-center py-2">
                <div className="animate-pulse text-gray-600">Lädt...</div>
              </div>
            )}
          </div>

          <div className="w-full flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Schreibe eine Nachricht..."
              className="flex-1 p-3 text-base border-2 border-red-700 rounded-lg"
              disabled={isLoading}
            />
            
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className={`px-6 py-3 text-white bg-red-700 rounded-lg transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800'
              }`}
            >
              Senden
            </button>
          </div>
        </div>
      </div>

      <AlertDialog 
        open={showInsufficientFundsAlert} 
        onOpenChange={setShowInsufficientFundsAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nicht genügend Punkte</AlertDialogTitle>
            <AlertDialogDescription>
              Du hast leider nicht genügend Punkte für diese Aktion. 
              Sammle mehr Punkte im "Punkte Chat", indem du umweltfreundliche Aktionen durchführst!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowInsufficientFundsAlert(false)}>
              Verstanden
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Journey;