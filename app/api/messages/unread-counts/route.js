import connectDB from '@/config/database';
import Messages from '@/models/Messages';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-counts
export const GET = async (request) => {
  try {
    // connect to db
    await connectDB();

    // get user session
    const userSession = await getUserSession();

    if (!userSession || !userSession.userId) {
      return new Response(
        JSON.stringify({ message: 'You need to logged in' }),
        { status: 401 }
      );
    }

    const { user } = userSession;

    let unreadMessagesCount = await Messages.countDocuments({
      recipent: user.id,
      read: false,
    });

    return new Response(JSON.stringify({ count: unreadMessagesCount }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error in get count of unread messages', {
      status: 500,
    });
  }
};
