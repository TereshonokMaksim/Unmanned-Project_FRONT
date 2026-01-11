export interface Order {
    id: number
    userId: number
    productIds: number[]
    totalAmount: number
    status: "pending" | "completed" | "canceled"
}