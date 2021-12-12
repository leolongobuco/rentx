import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.admin) throw new AppError("User isn't admin!");

  return next();
}