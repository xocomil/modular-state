/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import {
  ServiceResponse,
  vinDecoderResponseParser,
} from '../models/vin-decoder-response';

/*
 * VIN decoder is based on the NHTSA API
 * https://vpic.nhtsa.dot.gov/api/
 */

@Injectable()
export class VinDecoderService {
  readonly #baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/' as const;
  readonly #httpClient = inject(HttpClient);

  decodeVin(vin: string) {
    //https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1GCUYDED9NZ123456?format=json
    const decodeUrl = Location.joinWithSlash(this.#baseUrl, `decodevin/${vin}`);

    return this.#httpClient
      .get<ServiceResponse>(decodeUrl, { params: { format: 'json' } })
      .pipe(
        tap((response) => console.log('response before parse', response)),
        map((response) => vinDecoderResponseParser(response.Results)),
        map((response) =>
          filterNullishAndEmpty(
            response,
            (item) => item.Value !== null && item.Value !== '',
          ),
        ),
      );
  }

  decodeEquipment(vin: string) {
    //https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/1GCUYDED9NZ123456?format=json
  }
}

type FilterNullishAndEmpty<T> = T extends object
  ? { [key in keyof T]-?: Exclude<T[key], null> }
  : T;

function filterNullishAndEmpty<T extends object>(
  items: T[],
  filter: (item: T) => boolean,
): FilterNullishAndEmpty<T>[] {
  return items.filter(filter) as FilterNullishAndEmpty<T>[];
}
