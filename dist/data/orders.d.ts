export interface Order {
    id: number;
    name: string;
    phone: string;
    email?: string | undefined;
    calculationData: any;
    comment?: string | undefined;
    createdAt: string;
    status: 'new' | 'contacted' | 'completed';
}
declare const orders: Order[];
export default orders;
//# sourceMappingURL=orders.d.ts.map