'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookMarked] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      toast.error('U need to logged in to use bookmark property function');
    }
    try {
      // fetch from api route : POST /api/bookmarks
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        toast.success(data.message);
        setIsBookMarked(data.isBookmark);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to bookmarked property.');
    }
  };
  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
