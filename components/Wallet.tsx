'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Apple, PlusCircle } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMediaQuery } from "@/hooks/use-media-query"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { PayPalIcon, CreditCardIcon } from "./icons"

type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
}

const ChargeForm = ({
    chargeAmount,
    setChargeAmount,
    paymentMethod,
    setPaymentMethod,
    onCharge,
}: {
    chargeAmount: string
    setChargeAmount: (value: string) => void
    paymentMethod: string
    setPaymentMethod: (value: string) => void
    onCharge: () => void
}) => {
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

const ChargeDialog = ({
    isOpen,
    setIsOpen,
    chargeAmount,
    setChargeAmount,
    paymentMethod,
    setPaymentMethod,
    onCharge,
}: {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    chargeAmount: string
    setChargeAmount: (value: string) => void
    paymentMethod: string
    setPaymentMethod: (value: string) => void
    onCharge: () => void
}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Charge Wallet
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Charge Wallet</DialogTitle>
                        <DialogDescription>
                            Enter the amount you want to add to your wallet.
                        </DialogDescription>
                    </DialogHeader>
                    <ChargeForm
                        chargeAmount={chargeAmount}
                        setChargeAmount={setChargeAmount}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        onCharge={onCharge}
                    />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Charge Wallet
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Charge Wallet</DrawerTitle>
                    <DrawerDescription>
                        Enter the amount you want to add to your wallet.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <ChargeForm
                        chargeAmount={chargeAmount}
                        setChargeAmount={setChargeAmount}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        onCharge={onCharge}
                    />
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default function Wallet() {
    const [balance, setBalance] = useState(1234.56)
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 1, date: "2023-05-01", description: "Grocery Store", amount: -75.50 },
        { id: 2, date: "2023-05-02", description: "Salary Deposit", amount: 2000.00 },
        { id: 3, date: "2023-05-03", description: "Electric Bill", amount: -120.00 },
        { id: 4, date: "2023-05-04", description: "Online Purchase", amount: -50.25 },
        { id: 5, date: "2023-05-05", description: "Restaurant", amount: -45.00 },
    ])
    const [isOpen, setIsOpen] = useState(false)
    const [chargeAmount, setChargeAmount] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("cc")

    const handleCharge = () => {
        const amount = parseFloat(chargeAmount)
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount")
            return
        }

        const newBalance = balance + amount
        setBalance(newBalance)

        const newTransaction: Transaction = {
            id: transactions.length + 1,
            date: new Date().toISOString().split('T')[0],
            description: "Wallet Charge",
            amount: amount
        }

        setTransactions([newTransaction, ...transactions])
        setIsOpen(false)
        setChargeAmount("")
    }

    return (
        <Card className="w-full md:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>My Wallet</CardTitle>
                <CardDescription>Manage your funds and view recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">Balance</h2>
                    <p className="text-3xl font-semibold">${balance.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Recent Transactions</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        ${Math.abs(transaction.amount).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <CardFooter>
                <ChargeDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    chargeAmount={chargeAmount}
                    setChargeAmount={setChargeAmount}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    onCharge={handleCharge}
                />
            </CardFooter>
        </Card>
    )
}