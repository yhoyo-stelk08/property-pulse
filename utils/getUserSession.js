import { getServerSession } from 'next-auth';
import { authOption } from '@/utils/authOption';

export const getUserSession = async () => {
  const session = await getServerSession(authOption);

  try {
    if (!session | !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.log('Error: cannot get user session..',error)
    return null;
  }
};
