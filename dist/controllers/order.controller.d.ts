import { Request, Response } from "express";
interface OrderRequest {
    name: string;
    phone: string;
    email?: string;
    calculationData: any;
    comment?: string;
}
export declare const createOrder: (req: Request<{}, {}, OrderRequest>, res: Response) => Response<any, Record<string, any>>;
export declare const getOrders: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=order.controller.d.ts.map