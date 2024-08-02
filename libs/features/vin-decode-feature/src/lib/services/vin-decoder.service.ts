/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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

    return this.#httpClient.get(decodeUrl, { params: { format: 'json' } });
  }

  decodeEquipment(vin: string) {
    //https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/1GCUYDED9NZ123456?format=json
  }
}
