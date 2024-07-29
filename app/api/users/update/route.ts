import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { username, profilePicture, oldPassword, newPassword } = data;
    const userId = req.headers.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const currentUser = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true }
    });

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }


    const updateData: any = {};
    if (username) updateData.username = username;
    if (profilePicture) updateData.profilePicture = profilePicture;


    if (oldPassword && newPassword) {

      const isOldPasswordValid = await bcrypt.compare(oldPassword, currentUser.password);
      if (!isOldPasswordValid) {
        return NextResponse.json({ message: 'Invalid old password' }, { status: 400 });
      }


      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedNewPassword;
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}