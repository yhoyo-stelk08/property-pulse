import { useState, useEffect } from 'react';

const UnreadMessageCount = ({ session }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = session?.user?.id;

  // fetch unread message count from API
  useEffect(() => {
    try {
      if (!userId) {
        // toast.error('U need to logged in to use bookmark property function');
        return;
      }
      const fetchUnreadCount = async () => {
        const response = await fetch(`/api/messages/unread-counts`);

        if (response.status == 200) {
          const data = await response.json();
          setUnreadCount(data.count);
        }
      };

      fetchUnreadCount();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;
