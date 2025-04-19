'use client';
import { useEffect, useState, useRef } from 'react';
import { initSocket, getSocket } from '@/utils/socket';

const ROOMS = ['general', 'tech', 'law', 'support'];

export default function PublicChatRoom() {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState('general');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  // Auto-scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket connection only once
  useEffect(() => {
    // Create a safety mechanism to prevent rendering before socket is ready
    try {
      const sock = initSocket();
      if (sock) {
        setSocket(sock);
        setIsConnected(true);
        
        // Clean up function
        return () => {
          if (sock) {
            sock.off('chatHistory');
            sock.off('newPublicMessage');
          }
        };
      }
    } catch (error) {
      console.error("Socket initialization error:", error);
    }
  }, []);

  // Set up event listeners and handle room changes AFTER socket is connected
  useEffect(() => {
    if (!socket || !isConnected) return;
    
    console.log("Setting up socket listeners");
    
    // Set up event listeners
    socket.on('chatHistory', (msgs) => {
      console.log("Received chat history:", msgs);
      setMessages(msgs);
    });

    socket.on('newPublicMessage', (msg) => {
      console.log("Received new message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Join the room
    console.log("Joining room:", room);
    socket.emit('joinRoom', room);
    
    // Cleanup function for this effect only
    return () => {
      if (socket) {
        socket.off('chatHistory');
        socket.off('newPublicMessage');
      }
    };
  }, [socket, isConnected, room]);

  const handleSend = () => {
    if (!socket || !isConnected || !newMessage.trim()) return;
    
    const messageData = {
      room,
      username: username || 'Anonymous',
      text: newMessage.trim(),
    };
    
    console.log("Sending message:", messageData);
    socket.emit('publicMessage', messageData);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4 text-black">
      <h1 className="text-xl font-bold">Public Chat Rooms</h1>
      
      {!isConnected && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-2 rounded">
          Connecting to chat server...
        </div>
      )}

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {ROOMS.map((r) => (
          <button
            key={r}
            className={`px-4 py-2 rounded ${room === r ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setRoom(r)}
            disabled={!isConnected}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      <input
        placeholder="Your name (optional)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 rounded text-black"
        disabled={!isConnected}
      />

      <div className="h-64 overflow-y-auto border p-2 bg-gray-50 rounded text-black">
        {!isConnected ? (
          <p className="text-gray-500 text-center py-4">Connecting to chat server...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No messages yet in this room.</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2 pb-1 border-b border-gray-100">
              <span className="text-xs text-gray-500">{formatTime(msg.createdAt)}</span>
              <div>
                <strong className="text-blue-600">{msg.username}:</strong> {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message"
          className="flex-1 border p-2 rounded text-black"
          disabled={!isConnected}
        />
        <button 
          onClick={handleSend} 
          className={`px-4 py-2 rounded ${isConnected ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!isConnected}
        >
          Send
        </button>
      </div>
    </div>
  );
}