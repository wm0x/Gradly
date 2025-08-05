import { auth } from '@/auth'
import DashboardProfile from '@/components/pages/dashboard/profile'
import React from 'react'

export default async function page() {
    const session = await auth()
  return (
    <DashboardProfile session={session}/>
  )
}
