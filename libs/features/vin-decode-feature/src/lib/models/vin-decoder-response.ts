import {
  array,
  Infer,
  is,
  nullable,
  number,
  object,
  string,
} from 'superstruct';

export type ServiceResponse = {
  Count: number;
  Message: string;
  Results: unknown[];
  SearchCriteria: string;
};

const vinDecoderResponse = array(
  object({
    Value: nullable(string()),
    ValueId: nullable(string()),
    Variable: string(),
    VariableId: number(),
  }),
);

export type VinDecoderResponse = Infer<typeof vinDecoderResponse>;

export const vinDecoderResponseParser = (response: unknown[]) =>
  is(response, vinDecoderResponse) ? response : [];
