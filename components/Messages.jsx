'use client';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.status === 200) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };

    fetchMessages();
  }, []);
  return <div>Messages</div>;
};

export default Messages;
