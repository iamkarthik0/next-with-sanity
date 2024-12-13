import { cookies } from 'next/headers'

export async function setUserCookie(uniqueId: string) {
  const cookieStore = await cookies()
  cookieStore.set('userId', uniqueId, { httpOnly: true, secure: true })
}

export async function getUserCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('userId')?.value
}

