import InteractiveWallet from '@/components/Wallet'

export default function WalletPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Wallet</h1>
            <InteractiveWallet />
        </div>
    )
}