import connectDB from '@/config/database';
import User from '@/models/User';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

// POST /api/bookmarks
export const POST = async (request) => {
  try {
    // connect to db
    await connectDB();
    // get property id from the request body
    const { propertyId } = await request.json();
    // get user session from server
    const userSession = await getUserSession();
    // check if the session is set
    if (!userSession || !userSession.userId) {
      return new Response('You need to login to use bookmark', { status: 401 });
    }

    const { userId } = userSession;

    // find user in database
    const user = await User.findOne({ _id: userId });

    // check if the property is already bookmarked
    let isBookmark = user.bookmark.includes(propertyId);

    
    return new Response(JSON.stringify({ isBookmark }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error in trying bookmarked property', { status: 500 });
  }
};
