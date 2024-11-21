import InteractiveWallet from '@/components/Wallet'
import PurchaseInvoice from '@/components/purchase-invoice'

export default function WalletPage() {
    const samplePurchaseTime = new Date()
    const sampleDeliveryTime = new Date()
    sampleDeliveryTime.setDate(sampleDeliveryTime.getDate() + 7)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Wallet</h1>
            <InteractiveWallet />

            <div className="mt-8">
                <PurchaseInvoice
                    buyerFirstName="علی"
                    buyerLastName="محمدی"
                    sellerCompany="فروشگاه دیجیتال"
                    purchaseTime={samplePurchaseTime}
                    productPrice={299.99}
                    deliveryTime={sampleDeliveryTime}
                />
            </div>
        </div>
    )
}