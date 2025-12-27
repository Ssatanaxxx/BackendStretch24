import { Request, Response } from "express";
interface CalculationRequest {
    serviceId: number;
    length: number;
    width: number;
    extras?: Array<{
        id: number;
        length: number;
    }>;
    calculationMethod?: "perSquare" | "perimeterAndSquare";
}
export declare const calculatePrice: (req: Request<{}, {}, CalculationRequest>, res: Response) => Response<any, Record<string, any>>;
export default calculatePrice;
//# sourceMappingURL=calc.controller.d.ts.map