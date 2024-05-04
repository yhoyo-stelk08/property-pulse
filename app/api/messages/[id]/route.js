import Message from '@/components/Message';
import connectDB from '@/config/database';
import Messages from '@/models/Messages';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id

export const PUT = async (request, { params }) => {
  try {
    // connect to db
    await connectDB();

    const { id } = params;

    // get user session from server
    const userSession = await getUserSession();
    // check if the session is set
    if (!userSession || !userSession.userId) {
      return new Response('You need to login to use this function', {
        status: 401,
      });
    }

    const { userId } = userSession;

    const message = await Message.findById(id);

    if (!message) {
      return new Response('Message not found', { status: 404 });
    }

    // verify ownership
    if (message.recipent.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // update message to read / unread
    message.read = !message.read;

    message.save();

    return new Response(JSON.stringify(message), {status: 200})
  } catch (error) {
    console.log(error);
    return new Response('Error in updating message status', {status: 500})
  }
};
