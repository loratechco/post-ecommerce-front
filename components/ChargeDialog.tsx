import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { PlusCircle } from 'lucide-react'
import { useMediaQuery } from "@/hooks/use-media-query"
import { ChargeForm } from "./ChargeForm"

interface ChargeDialogProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    chargeAmount: string
    setChargeAmount: (value: string) => void
    paymentMethod: string
    setPaymentMethod: (value: string) => void
    onCharge: () => void
}

export const ChargeDialog = ({
    isOpen,
    setIsOpen,
    chargeAmount,
    setChargeAmount,
    paymentMethod,
    setPaymentMethod,
    onCharge,
}: ChargeDialogProps) => {
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