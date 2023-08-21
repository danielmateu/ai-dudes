"use client"

import { Category, Dude } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from 'zod'

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
interface DudeFormProps {
    initialData: Dude | null
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().nonempty().min(1, {
        message: "Se requiere un nombre"
    }),
    description: z.string().nonempty().min(1, {
        message: "Se requiere una descripción"
    }),
    instruction: z.string().nonempty().min(200, {
        message: "Se requiere una instrucción de almenos 200 caracteres"
    }),
    seed: z.string().nonempty().min(200, {
        message: "Se requiere una semilla de almenos 200 caracteres"
    }),
    src: z.string().nonempty().min(1, {
        message: "Se requiere una imagen"
    }),
    categoryId: z.string().min(1, {
        message: "Se requiere una categoría"
    })
})

export const DudeForm = ({
    categories, initialData
}: DudeFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: '',
            instruction: '',
            seed: '',
            src: '',
            categoryId: undefined
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2  w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                Información general
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Información general del colega
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name="src"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    Image Upload Component
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}
