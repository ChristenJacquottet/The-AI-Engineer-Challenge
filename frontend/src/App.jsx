import { useState, useEffect, useRef } from 'react';
import './App.css';
import './retro-mac.css';
import './crt-frame.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const newMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setLoading(true);

    // Send user message to backend and stream response
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_message: newMessage.text })
      });
      if (!response.body) throw new Error('No response body');
      const reader = response.body.getReader();
      let botText = '';
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          botText += new TextDecoder().decode(value);
          setMessages(prev => {
            // If last message is bot and still streaming, update it
            if (prev[prev.length - 1]?.sender === 'bot') {
              return [
                ...prev.slice(0, -1),
                { ...prev[prev.length - 1], text: botText }
              ];
            } else {
              // Otherwise, add a new bot message
              return [
                ...prev,
                {
                  text: botText,
                  sender: 'bot',
                  timestamp: new Date().toISOString(),
                }
              ];
            }
          });
        }
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          text: 'Sorry, there was an error connecting to the vintage Mac backend.',
          sender: 'bot',
          timestamp: new Date().toISOString(),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crt-frame">
      <div className="crt-apple-logo" />
      <div className="crt-power-led" />
      <div className="crt-screen">
        <div className="app-container retro-mac-window">
          <div className="chat-container window-content">
            <div className="window-title-bar">
              <span>AI Chat Interface</span>
            </div>
            <div className="messages-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'} pixelated`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="message-input retro-input"
                disabled={loading}
              />
              <button type="submit" className="send-button retro-button" disabled={loading || !inputMessage.trim()}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 