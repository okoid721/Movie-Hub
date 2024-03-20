import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/option';
import User from '@/models/User';
import { connectToDB } from '@/lib/mongoDB';
import toast from 'react-hot-toast';

export const fetchMyList = async () => {
  const session: any | null = await getServerSession(options);

  if (!session?.user?.email) {
    toast.error('No user log in');
  }

  await connectToDB();

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    throw new Error('User not found');
  }

  return user.favorites;
};
