import { Static, Type } from '@sinclair/typebox';

export const CreateTaskDto = Type.Object({
  title: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
  status: Type.Optional(Type.Union([
    Type.Literal('todo'),
    Type.Literal('in_progress'),
    Type.Literal('done')
  ])),
  priority: Type.Optional(Type.Union([
    Type.Literal('low'),
    Type.Literal('medium'),
    Type.Literal('high')
  ])),
});

export type CreateTaskDtoType = Static<typeof CreateTaskDto>;
