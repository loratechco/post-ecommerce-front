import PurchaseInvoice from "./components/purchase-invoice"

export default function Home() {
  const sampleInvoiceData = {
    buyerFirstName: "John",
    buyerLastName: "Doe",
    sellerCompany: "Acme Corporation",
    purchaseTime: new Date(),
    productPrice: 199.99,
    deliveryTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  }

  return (
    <main className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Invoice Details</h1>
      <PurchaseInvoice {...sampleInvoiceData} />
    </main>
  )
}

