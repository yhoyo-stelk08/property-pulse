import connectDB from '@/config/database';
import Messages from '@/models/Messages';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

// GET /api/messages
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

    let readMessages = await Messages.find({ recipent: user.id, read: true })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    let unreadMessages = await Messages.find({ recipent: user.id, read: false })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    let messages = [...unreadMessages, ...readMessages];
    // console.log(messages)

    if (!messages) {
      messages = [];
    }

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log('Error in fetching message for user', error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/messsages
export const POST = async (request) => {
  try {
    // connect to db
    await connectDB();
    // deconstruct data from
    const { name, email, phone, message, recipent, property } =
      await request.json();
    // get user session
    const userSession = await getUserSession();

    if (!userSession || !userSession.userId) {
      return new Response(
        JSON.stringify({ message: 'You need to logged in' }),
        { status: 401 }
      );
    }

    const { user } = userSession;

    // can not send message to self
    if (user.id === recipent) {
      return new Response(
        JSON.stringify({ message: 'Cannot send message to your self' }),
        { status: 400 }
      );
    }

    const newMessage = new Messages({
      sender: user.id,
      recipent: recipent,
      property: property,
      name: name,
      email: email,
      phone: phone,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message has been sent' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error in sending message', { status: 500 });
  }
};
