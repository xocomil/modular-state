import { FilterNullishAndEmpty } from './filter-nullish-and-empty';
import { VinDecoderResponse } from './vin-decoder-response';

export type VehicleResponse = {
  year: number;
  make: string;
  model: string;
  trimLevel: string;
};

type FilterNullishAndEmptyArray<T> =
  T extends Array<infer U> ? FilterNullishAndEmpty<U>[] : T;

export function convertVinDecoderResponseToVehicleResponse(
  response: FilterNullishAndEmptyArray<VinDecoderResponse>,
): VehicleResponse {
  const record = convertToRecord(response);

  console.log('record', record);

  const {
    Make: make,
    Model,
    ModelYear: year,
    Trim: trimLevel,
    Series: series,
  } = record;

  const model = [series, Model].join(' ').trim();

  return {
    year: parseInt(year, 10),
    make,
    model,
    trimLevel,
  };
}

function convertToRecord(
  response: FilterNullishAndEmptyArray<VinDecoderResponse>,
): Record<string, string> {
  return response.reduce(
    (recordToReturn, currentItem) => {
      recordToReturn[currentItem.Variable.replaceAll(' ', '')] =
        currentItem.Value;
      return recordToReturn;
    },
    {} as Record<string, string>,
  );
}
