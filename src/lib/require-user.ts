import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

export async function requireUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  const userId = await verifyAuthToken(token);

  if (!userId) {
    throw new Error('UNAUTHORIZED');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('UNAUTHORIZED');
  }

  return user;
}
