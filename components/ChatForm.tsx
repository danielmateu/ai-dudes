"use client"


import { ChatRequestOptions } from 'ai'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SendHorizonal } from 'lucide-react'


interface ChatFormProps {
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void
    isLoading: boolean

}

export const ChatForm = ({
    input,
    handleInputChange,
    onSubmit,
    isLoading
}: ChatFormProps) => {
    return (
        <form onSubmit={onSubmit} className='border-t border-primary/10 py-4 flex flex-center gap-x-2'>
            <Input
                disabled={isLoading}
                value={input}
                onChange={handleInputChange}
                placeholder="Escribe un mensaje"
                className="rounded-lg bg-primary/10"
            />

            <Button disabled={isLoading} variant={'ghost'}>
                <SendHorizonal size={18} />
            </Button>
        </form>
    )
}
