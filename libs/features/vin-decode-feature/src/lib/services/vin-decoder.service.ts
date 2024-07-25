import { Injectable } from '@angular/core';

/*
 * VIN decoder is based on the NHTSA API
 * https://vpic.nhtsa.dot.gov/api/
 */

@Injectable()
export class VinDecoderService {
  decodeVin(vin: string) {
    //https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1GCUYDED7NZ123456?format=json
  }

  decodeEquipment(vin: string) {
    //https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/1GCUYDED7NZ123456?format=json
  }
}
