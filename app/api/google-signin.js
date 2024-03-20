// pages/api/google-signin.js

import { getSession } from 'next-auth/client';
import { getProviders, signIn as googleSignIn } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    res.status(200).json({ message: 'Already signed in.' });
    return;
  }

  const providers = await getProviders();
  const googleProvider = providers.find((provider) => provider.id === 'google');

  if (!googleProvider) {
    res.status(400).json({ message: 'Google provider not found.' });
    return;
  }

  try {
    await googleSignIn(req, res, { provider: googleProvider.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
