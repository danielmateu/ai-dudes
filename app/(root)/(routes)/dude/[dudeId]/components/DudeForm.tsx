"use client"

import { Category, Dude } from "@prisma/client"


interface DudeFormProps {
    initialData: Dude | null
    categories: Category[]
}

export const DudeForm = ({
    categories, initialData
}: DudeFormProps) => {


    return (
        <div>DudeForm</div>
    )
}
