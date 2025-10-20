'use client'

import { useHeader } from '@/contexts/header-context'
import { useEffect } from 'react'

interface PageTitleProps {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  const { setTitle } = useHeader()

  useEffect(() => {
    setTitle(title)
  }, [title, setTitle])

  return null
}
