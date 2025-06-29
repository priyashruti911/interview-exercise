import { Type, Static } from '@sinclair/typebox';

export const CreateProjectDto = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
});

export type CreateProjectDtoType = Static<typeof CreateProjectDto>;