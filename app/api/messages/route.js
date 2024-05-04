import connectDB from '@/config/database';
import Messages from '@/models/Messages';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';
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
