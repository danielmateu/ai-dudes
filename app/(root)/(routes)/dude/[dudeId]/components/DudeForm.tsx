"use client"

import { Category, Dude } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from 'zod'

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "@/components/ImageUpload"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

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
    instructions: z.string().nonempty().min(200, {
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
            name: '',
            description: '',
            instructions: '',
            seed: '',
            src: '',
            categoryId: undefined
        }
    })

    const router = useRouter()

    const { toast } = useToast()

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values);
        try {
            if (initialData) {
                // Update dude functionality
                await axios.patch(`/api/dude/${initialData.id}`, values)
            } else {
                // Create dude functionality
                await axios.post(`/api/dude`, values)
            }

            toast({
                variant: 'default',
                description: 'Colega creado exitosamente'
            })

            router.refresh()
            router.push('/')

        } catch (error) {
            // console.log(error, 'Algo ha salido mal');
            toast({
                variant: 'destructive',
                description: 'Algo ha salido mal'
            })
        }
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
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel htmlFor="name">Nombre</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="Elon Musk" {...field} id="name" />

                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Así es como tu Colega AI será llamado
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel htmlFor="description">Descripción</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="CEO & fundador de Tesla, Space X..." {...field} id="description" />
                                    </FormControl>
                                    <FormDescription>
                                        Una breve descripción de tu colega
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoría</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue
                                                    className="flex items-center space-x-2"
                                                    defaultValue={field.value}
                                                    placeholder="Selecciona una categoría"
                                                >

                                                </SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Selecciona una categoría para tu colega
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className='text-lg font-medium'>Configuaración</h3>
                            <p className="text-sm text-muted-foreground">
                                Instrucciones detalladas para el comportamiento de tu colega
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name='instructions'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel htmlFor="name">Instrucciones</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-background resize-none"
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={PREAMBLE}
                                        {...field}
                                        id="instruction" />

                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    Instrucciones detalladas para el comportamiento de tu colega
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='seed'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel htmlFor="name">Ejemplo de conversación</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-background resize-none"
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={SEED_CHAT}
                                        {...field}
                                        id="instruction" />

                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    Ejemplo de conversación para que tu colega sepa cómo interactuar con los usuarios
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button size='lg' disabled={isLoading}>
                            {isLoading ? 'Edita a tu colega' : 'Crea a tu colega'}
                            <Wand2 className="ml-2" size={20} />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
