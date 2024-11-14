'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'

type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
}

export default function WalletWithPagination() {
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
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4

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

    const totalPages = Math.ceil(transactions.length / itemsPerPage)
    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <Card className="w-full max-w-md mx-auto">
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
                            {paginatedTransactions.map((transaction) => (
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
                    {transactions.length > 4 && (
                        <div className="flex justify-center mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <span className="mx-4 flex items-center">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
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
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Amount
                                </Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={chargeAmount}
                                    onChange={(e) => setChargeAmount(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCharge}>Charge</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}