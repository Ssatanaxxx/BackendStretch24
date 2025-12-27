import { Request, Response } from "express";
import services from "../data/services";

export const getServices = (req: Request, res: Response) => {
  res.json(services);
};