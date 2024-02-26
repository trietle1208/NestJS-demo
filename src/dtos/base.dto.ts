import { Expose, plainToClass } from 'class-transformer';

export abstract class BaseDTO {
  @Expose()
  id: number;

  static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
