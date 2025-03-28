import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // You can choose any style you prefer
import './Message.css';

interface MessageProps {
  message: string;
  isBot: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isBot }) => {
  const codeRef = useRef<HTMLElement>(null);
  const isCode = isBot && message.trim().startsWith('```tsx') && message.trim().endsWith('```');
  const codeContent = isCode ? message.trim().slice(6, -3).trim() : message;
  const [buttonText, setButtonText] = useState('Copy');

  useEffect(() => {
    if (isCode && codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [isCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent).then(() => {
      setButtonText('Copied');
      setTimeout(() => setButtonText('Copy'), 2000); // Reset to "Copy" after 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div
      className={`message__container ${
        isBot ? 'message__container--bot' : 'message__container--user'
      }`}
    >
      <div className="message__avatar">
        <img
          src={
            isBot
              ? 'https://avatars.githubusercontent.com/u/194470184?v=4&size=64'
              : 'https://avatars.githubusercontent.com/u/194460184?v=4&size=64'
          }
          alt={isBot ? 'Bot Avatar' : 'User Avatar'}
        />
        <div className="username">Sanjeet9271</div>
      </div>
      <div className="message__body">
        {isCode ? (
          <div>
            <pre>
              <code ref={codeRef} className="tsx">{codeContent}</code>
            </pre>
            <button onClick={handleCopy} className="copy-button">{buttonText}</button>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
