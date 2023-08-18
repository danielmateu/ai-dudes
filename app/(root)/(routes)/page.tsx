import { SearchInput } from '@/components/SearchInput'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const RootPage = () => {
    return (
        <div className='h-full p-4 space-y-2'>
            {/* <UserButton afterSignOutUrl='/' /> */}
            <SearchInput />
        </div>
    )
}

export default RootPage