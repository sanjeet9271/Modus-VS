import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Message from './components/Message';
import { useState, useEffect, useRef } from 'react';

interface MessageData {
  text: string;
  isBot: boolean;
}

function App() {
  const [messages, setMessages] = useState<MessageData[]>([]); 
  const chatboxRef = useRef<HTMLDivElement | null>(null); 

  const handleSendMessage = (newMessage: MessageData) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]); 
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTo({
        top: chatboxRef.current.scrollHeight,
        behavior: 'smooth', 
      });
    }
  }, [messages]);

  return (
    <>
      <div className="main__container">
        {messages.length === 0 ? (
          <Banner />
        ) : (
          <div className="message__chatbox" ref={chatboxRef}>
            {messages.map((msg, index) => (
              <Message key={index} message={msg.text} isBot={msg.isBot} /> // Pass isBot prop
            ))}
          </div>
        )}
        <Footer onSendMessage={handleSendMessage} />
      </div>
    </>
  );
}

export default App;