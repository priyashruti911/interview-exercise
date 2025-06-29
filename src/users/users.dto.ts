import { Type, Static } from '@sinclair/typebox';

export const CreateUserDto = Type.Object({
  username: Type.String({ minLength: 3 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 })
});

export const UserResponseDto = Type.Object({
  id: Type.String(),
  username: Type.String(),
  email: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
});
