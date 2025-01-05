'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PlusIcon } from "lucide-react"
import { RiAppleLine, RiBankCardLine, RiPaypalLine } from "@remixicon/react"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"

const walletSchema = z.object({
    amount: z.number().min(1),
})

// تعریف آرایه آیتم های پرداخت در خارج از کامپوننت
const paymentMethods = [
    {
        id: "cc",
        label: "Card",
        icon: RiBankCardLine
    },
    {
        id: "paypal",
        label: "PayPal",
        icon: RiPaypalLine
    },
    {
        id: "apple-pay",
        label: "Apple Pay",
        icon: RiAppleLine
    }
]

export default function Wallet() {
    const [open, setOpen] = useState(false)
    const [chargeAmount, setChargeAmount] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("cc")

    const onCharge = () => {
        const amount = parseFloat(chargeAmount)
        if (isNaN(amount) || amount <= 0) {
            toast({
                title: "Unsuccessful",
                description: "Please enter a valid amount",
                className: "bg-red-400 text-red-950 border-none",
            })
            return
        }

        const zodError = walletSchema.safeParse({ amount })
        console.log(zodError);
        if (!zodError.success) {
            toast({
                title: "Unsuccessful",
                description: "Please enter a valid amount",
                variant: "destructive",
            })
            return;
        }
        console.log("Charging wallet with:", amount, "using", paymentMethod)
        setOpen(false)
        setChargeAmount("")
    }

    return (
        <>
            <div className="w-full">

                <div className=" overflow-hidden flex items-start justify-center flex-col rounded-2xl border-2 border-zinc-700 max-md:h-[11.5rem] max-md:max-w-sm h-[13rem] md:max-w-lg  md:h-[16rem]  py-3 px-4 bg-gradient-to-br from-zinc-800 to-zinc-600 shadow-md shadow-black/20">

                    <div className="h-1/2  w-full flex items-start justify-end">
                        <div className="flex items-start justify-between gap-2 w-full">
                            <p className="text-zinc-100 text-sm font-bold md:text-base">Wallet</p>
                            <PlusIcon
                                className="size-5.5 md:size-6 cursor-pointer text-zinc-100"
                                onClick={() => setOpen(true)}
                            />
                        </div>
                    </div>

                    <div className="h-1/2 w-full flex justify-end flex-col items-start gap-2">
                        <p className="max-md:text-3xl text-4xl font-semibold text-zinc-100">$178,000<span className="text-3xl">.56</span></p>
                        <p className="text-zinc-50 text-sm font-semibold">Account: 012551</p>
                    </div>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-sm:max-w-xs max-w-md h-80 overflow-hidden rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Charge Wallet</DialogTitle>
                    </DialogHeader>
                    <form className="grid items-start gap-4" onSubmit={(e) => {
                        e.preventDefault();
                        onCharge()
                    }}>
                        <div className="grid gap-2">
                            <Label htmlFor="amount" className="block">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={chargeAmount}
                                onChange={(e) => setChargeAmount(e.target.value)}
                                min={1}
                            />
                        </div>

                        <RadioGroup
                            className="grid grid-cols-3 gap-4"
                            defaultValue="cc"
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                        >
                            {paymentMethods.map(({ id, label, icon: Icon }) => (
                                <label key={id} className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                                    <RadioGroupItem
                                        id={`radio-12-${id}`}
                                        value={id}
                                        className="sr-only after:absolute after:inset-0"
                                    />
                                    <Icon className="opacity-60" size={20} aria-hidden="true" />
                                    <p className="text-xs font-medium leading-none text-foreground">{label}</p>
                                </label>
                            ))}
                        </RadioGroup>

                        <Button type="submit">Charge</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}