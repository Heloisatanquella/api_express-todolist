/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(DtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(DtoClass, req.body);

    const errors = await validate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const messages = errors.flatMap((error) => {
        if ((error as any).children?.length) {
          return (error as any).children.map((child: any) =>
            child.constraints ? Object.values(child.constraints) : []
          );
        }

        if (error.constraints) {
          console.log(Object.keys(error.constraints));
          const errorsKey = Object.keys(error.constraints);
          const KEY_WHITE_LIST_VALIDATION = "whitelistValidation";

          const hasWhiteListError = errorsKey.includes(
            KEY_WHITE_LIST_VALIDATION
          );

          if (hasWhiteListError) {
            return [
              `The property '${(error as any).property}' is not allowed`,
            ];
          }
          return Object.values(error.constraints);
        }

        return [];
      });

      res.status(400).json({ errors: messages.flat() });
    } else {
      req.body = dtoObject;
      return next();
    }
  };
}
