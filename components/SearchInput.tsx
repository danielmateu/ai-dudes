"use client"

import { Search, SearchIcon } from 'lucide-react'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import qs from 'query-string';


export const SearchInput = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const categoryId = searchParams.get('categoryId')
    const name = searchParams.get('name')

    const [value, setValue] = useState(name || '')
    const debouncedValue = useDebounce(value, 500)

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId: categoryId
        }
        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debouncedValue, router, categoryId])

    return (
        <div className='relative'>
            <Search className='absolute h-4 w-4 top-3 left-3' />
            <Input
                onChange={onChange}
                value={value}
                placeholder='Buscar...'
                className='pl-10 bg-primary/10'
            />
        </div>
    )
}
