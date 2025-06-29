import { Type, Static } from '@sinclair/typebox';

export const UpdateTaskStatusDtoType = Type.Object({
  status: Type.Union([
    Type.Literal('todo'),
    Type.Literal('in_progress'),
    Type.Literal('done'),
  ]),
});

export type UpdateTaskStatusDto = Static<typeof UpdateTaskStatusDtoType>;
