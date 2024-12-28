import React from 'react'
import { Button } from "@/components/ui/button"

function Header() {
  return (
    <div className='h-12 w-full flex items-center justify-between py-8 px-10'>
        <h1 className='text-2xl font-semibold'>Shortyourl</h1>
        <div className='flex gap-5 items-center'>
        <div className=''>Sign up</div>
        <Button variant="outline">Login</Button>
        </div>
    </div>
  )
}

export default Header