import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Apple } from 'lucide-react'
import { PayPalIcon, CreditCardIcon } from "./icons"

interface ChargeFormProps {
    chargeAmount: string
    setChargeAmount: (value: string) => void
    paymentMethod: string
    setPaymentMethod: (value: string) => void
    onCharge: () => void
}

export const ChargeForm = ({
    chargeAmount,
    setChargeAmount,
    paymentMethod,
    setPaymentMethod,
    onCharge,
}: ChargeFormProps) => {
    return (
        <form className="grid items-start gap-4" onSubmit={(e) => {
            e.preventDefault()
            onCharge()
        }}>
            <div className="grid gap-2">
                <Label htmlFor="amount" className="block">Amount</Label>
                <Input
                    id="amount"
                    type="number"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label className="block">Payment Method</Label>
                <RadioGroup
                    className="grid grid-cols-3 gap-2"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                >
                    {/* Credit card */}
                    <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                        <RadioGroupItem
                            id="radio-12-cc"
                            value="cc"
                            className="sr-only after:absolute after:inset-0"
                        />
                        <CreditCardIcon />
                        <p className="text-xs font-medium leading-none text-foreground">Card</p>
                    </label>
                    {/* PayPal */}
                    <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                        <RadioGroupItem
                            id="radio-12-paypal"
                            value="paypal"
                            className="sr-only after:absolute after:inset-0"
                        />
                        <PayPalIcon />
                        <p className="text-xs font-medium leading-none text-foreground">PayPal</p>
                    </label>
                    {/* Apple Pay */}
                    <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                        <RadioGroupItem
                            id="radio-12-apple-pay"
                            value="apple-pay"
                            className="sr-only after:absolute after:inset-0"
                        />
                        <Apple className="opacity-60" size={20} />
                        <p className="text-xs font-medium leading-none text-foreground">Apple Pay</p>
                    </label>
                </RadioGroup>
            </div>
            <Button type="submit">Charge</Button>
        </form>
    )
} 