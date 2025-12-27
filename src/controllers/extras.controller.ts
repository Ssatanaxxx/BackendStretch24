import { Request, Response } from "express";
import extras from "../data/extras";

export const getExtras = (req: Request, res: Response) => {
  res.json(extras);
};