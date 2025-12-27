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

const orders: Order[] = [];

export default orders;