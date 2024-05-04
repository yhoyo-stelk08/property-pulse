import connectDB from '@/config/database';
import Messages from '@/models/Messages';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id

export const PUT = async (request, { params }) => {
  try {
    // connect to db
    await connectDB();

    const {id} = params

    // get user session from server
    const userSession = await getUserSession();
    // check if the session is set
    if (!userSession || !userSession.userId) {
      return new Response('You need to login to use this function', { status: 401 });
    }

    const { userId } = userSession;
  } catch (error) {}
};
