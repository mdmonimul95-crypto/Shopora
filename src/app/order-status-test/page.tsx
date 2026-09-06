"use client"
import { updateSellerOrderStatus } from '@/lib/api/sellerOrders'
import React, { useState } from 'react'



const TestOrderStatusPage  = () => {
    const [result, setResult] = useState<object  | null>(null)

    const testUpdate = async() => {
        try{
            const response = await updateSellerOrderStatus(
                 "ca80241a-c9bd-4625-89cf-e44f953d154d",
        "CANCELLED"
            )

            // console.log("TEST PAGE - Success:", response);
            setResult(response)
        }catch(err) {
             console.error("TEST PAGE - Error:", err);
        }
    }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold">
        Test Order Status Update
      </h1>

      <button
        onClick={testUpdate}
        className="mt-5 rounded-md bg-teal-600 px-5 py-3 text-white"
      >
        Update Order Status
      </button>

      {result && (
        <pre className="mt-5 rounded-md bg-gray-100 p-5">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  )
}

export default TestOrderStatusPage 