import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import type { Static, TSchema } from '@sinclair/typebox';

@Injectable()
export class TypeboxValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: import('@nestjs/common').ArgumentMetadata) {
    const schema = metadata.metatype;
    if (
      !schema ||
      typeof schema !== 'object' ||
      !('static' in schema) ||
      !('params' in schema)
    ) {
      return value;
    }

    const compiler = TypeCompiler.Compile(schema as TSchema);
    const result = compiler.Check(value);

    if (!result) {
      const errors = [...compiler.Errors(value)].map((e) => `${e.path}: ${e.message}`);
      throw new BadRequestException(errors.join('\n'));
    }

    return value;
  }
}
