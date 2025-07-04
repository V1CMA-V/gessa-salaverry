import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link href="/dashboard">
        <Button className="cursor-pointer">Dashboard</Button>
      </Link>
    </div>
  )
}
