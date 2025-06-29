import { Type, Static } from '@sinclair/typebox';

export const RegisterDto = Type.Object({
  username: Type.String({ minLength: 3 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
});
export type RegisterDto = typeof RegisterDto.static;
