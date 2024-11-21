"use client"

import { format } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PurchaseInvoiceProps {
  buyerFirstName: string
  buyerLastName: string
  sellerCompany: string
  purchaseTime: Date
  productPrice: number
  deliveryTime: Date
}

export default function PurchaseInvoice({
  buyerFirstName,
  buyerLastName,
  sellerCompany,
  purchaseTime,
  productPrice,
  deliveryTime,
}: PurchaseInvoiceProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Purchase Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Table view for lg screens and above */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Detail</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Buyer</TableCell>
                <TableCell>{`${buyerFirstName} ${buyerLastName}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Seller</TableCell>
                <TableCell>{sellerCompany}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Purchase Time</TableCell>
                <TableCell>{format(purchaseTime, "PPpp")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Product Price</TableCell>
                <TableCell>${productPrice.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Estimated Delivery</TableCell>
                <TableCell>{format(deliveryTime, "PPP")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Box view for screens smaller than lg */}
        <div className="lg:hidden space-y-4">
          <div>
            <Label className="font-semibold">Buyer</Label>
            <p>{`${buyerFirstName} ${buyerLastName}`}</p>
          </div>
          <div>
            <Label className="font-semibold">Seller</Label>
            <p>{sellerCompany}</p>
          </div>
          <div>
            <Label className="font-semibold">Purchase Time</Label>
            <p>{format(purchaseTime, "PPpp")}</p>
          </div>
          <div>
            <Label className="font-semibold">Product Price</Label>
            <p>${productPrice.toFixed(2)}</p>
          </div>
          <div>
            <Label className="font-semibold">Estimated Delivery</Label>
            <p>{format(deliveryTime, "PPP")}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Thank you for your purchase!</p>
        <p className="text-sm font-semibold">Total: ${productPrice.toFixed(2)}</p>
      </CardFooter>
    </Card>
  )
}

