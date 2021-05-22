import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

export class CustomResponse {
  static SuccessResponse<T>(res: Response, code: HttpStatus, data: T) {
    return res.status(code).json({ success: true, result: data });
  }

  static FailedResponse(
    res: Response,
    code: HttpStatus,
    resource: string,
    id?: number,
  ) {
    return res.status(code).json({
      success: false,
      result: CustomResponse.GetException(code, resource, id),
    });
  }

  private static GetException(code: HttpStatus, resource: string, id?: number) {
    switch (code) {
      case 400:
        return CustomResponse.GetBadRequest(resource, id);
      case 401:
        return CustomResponse.GetUnauthorized(resource);
      case 403:
        return CustomResponse.GetForbidden(resource);
      case 404:
        return CustomResponse.GetNotFound(resource);
    }
  }

  private static GetBadRequest(resource: string, id: number) {
    return new BadRequestException(`No hay ${resource} con el id ${id}`);
  }

  private static GetUnauthorized(resource: string) {
    return new UnauthorizedException(`No estas autorizado para ${resource}`);
  }

  private static GetForbidden(resource: string) {
    return new ForbiddenException(`No tienes acceso a ${resource}`);
  }

  private static GetNotFound(resource: string) {
    return new NotFoundException(`No se encontro el recurso ${resource}`);
  }
}
