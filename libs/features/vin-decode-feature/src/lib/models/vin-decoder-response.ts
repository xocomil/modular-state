import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export type ServiceResponse = {
  Count: number;
  Message: string;
  Results: unknown[];
  SearchCriteria: string;
};

const vinDecoderResponse = Type.Array(
  Type.Object({
    Value: Type.Union([Type.String(), Type.Null()]),
    ValueId: Type.Union([Type.String(), Type.Null()]),
    Variable: Type.String(),
    VariableId: Type.Integer(),
  }),
);

type VinDecoderResponse = Static<typeof vinDecoderResponse>;

export const vinDecoderResponseParser = (
  response: unknown,
): VinDecoderResponse => Value.Parse(vinDecoderResponse, response);
