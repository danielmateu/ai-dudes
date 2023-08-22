"use client"

import { useProModal } from "@/hooks/use-pro-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useState } from "react"
import axios from "axios"


export const ProModal = () => {

    const proModal = useProModal()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)


    const onSubscribe = async () => {
        try {
            setLoading(true)

            const response = await axios.get('/api/stripe')

            window.location.href = response.data.url
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Algo ha salido mal...'
            })

        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade a Pro!
                    </DialogTitle>
                    <DialogDescription className="text-center space-y-2">
                        Crear <span className="text-sky-500 mx-1">Colegas AI</span> personalizados!
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">€9<span className="text-sm font-normal">.99 / mensual</span></p>
                    <Button variant={'premium'} onClick={onSubscribe} disabled={loading}>
                        Suscríbete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
