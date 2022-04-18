import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const validationBodyMiddleware = (classDTO: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const plainClass = plainToInstance(classDTO, req.body);
    validate(plainClass, { skipMissingProperties: false }).then(errors => {
      const responseError = {
        status: 400,
        message: 'Request body validation error',
        errors: [],
      };

      if (errors.length > 0) {
        errors.forEach(error => {
          responseError.errors.push({
            field: error.property,
            message: error.constraints,
          });
        });

        res.status(400).send(responseError);
      } else {
        next();
      }
    });
  };
};

export const validationParamsMiddleware = (classDTO: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const plainClass: object[] = plainToInstance(classDTO, req.params);

    validate(plainClass, { skipMissingProperties: false }).then(errors => {
      const responseError = {
        status: 400,
        message: 'Request router params validation error',
        errors: [],
      };

      if (errors.length > 0) {
        errors.forEach(error => {
          responseError.errors.push({
            field: `/:${error.property}`,
            message: error.constraints,
          });
        });

        res.status(400).send(responseError);
      } else {
        next();
      }
    });
  };
};

export const validationQueryMiddleware = (classDTO: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const plainClass: object[] = plainToInstance(classDTO, req.query);

    validate(plainClass, { skipMissingProperties: false }).then(errors => {
      const responseError = {
        status: 400,
        message: 'Request query params validation error',
        errors: [],
      };

      if (errors.length > 0) {
        errors.forEach(error => {
          responseError.errors.push({
            field: `/:${error.property}`,
            message: error.constraints,
          });
        });

        res.status(400).send(responseError);
      } else {
        next();
      }
    });
  };
};
