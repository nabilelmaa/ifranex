import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google-callback`
);

const JWT_SECRET = process.env.JWT_SECRET!;

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ message: 'Authorization code not found' }, { status: 400 });
  }

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json({ message: 'Google authentication failed' }, { status: 401 });
    }

    const { email, name, picture } = payload;

    let user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email: email || '',
          username: name || '',
          profilePicture: picture || '',
          password: '', 
        },
      });
    }


  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
