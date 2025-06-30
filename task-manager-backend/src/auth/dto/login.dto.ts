import { Type, Static } from '@sinclair/typebox';

export const LoginDto = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
});
export type LoginDto = typeof LoginDto.static;
