"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Home() {
  const router = useRouter()
  function navigate(url:string){
    router.push(url);
  }
  return (
    <div className='w-full h-full flex flex-col flex-1 py-4'>
        <div className='flex flex-col justify-center items-center flex-1'>
            <img src='/logo.png' alt="VaultX logo" width={100} height={80}/>
            <span className='text-heading mt-2'>
                Welcome
            </span>
        </div>
        <div className='flex flex-col mt-2 gap-4'>
          <Button className='py-6' onClick={()=>navigate('/auth/create')}>
              Create a new account
          </Button>
          <Button className='py-6' variant={'secondary'}  onClick={()=>navigate('/auth/import/recovery-phrase')}>
              Import Secret Recovery Phrase
          </Button>
        </div>
    </div>
  )
}
