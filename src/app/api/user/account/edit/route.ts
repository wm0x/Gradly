import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { name, username, email, password } = await req.json()

  const data: any = {
    name,
    username,
    email,
  }

  if (password) {
    const hashed = await bcrypt.hash(password, 10)
    data.password_hash = hashed
  }

  try {
    await db.user.update({
      where: { email: session.user.email },
      data,
    })

    return NextResponse.json({ message: 'Profile updated' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
