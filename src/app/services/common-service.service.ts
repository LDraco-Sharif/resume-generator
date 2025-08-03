import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

  generateId() {
    return Math.random().toString(36).slice(2, 9);
  }

}
