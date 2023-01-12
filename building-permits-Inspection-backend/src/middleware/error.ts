import { NextFunction, Request, Response } from "express";

const errorMiddlware = async (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).json({ error: error.message })
}

export default errorMiddlware