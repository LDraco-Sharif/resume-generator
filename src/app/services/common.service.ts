import { Injectable } from '@angular/core';
import { EducationScoreType } from '../enums/education-score-type';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  generateId() {
    return Math.random().toString(36).slice(2, 9);
  }

  getLocalStorageItem(key: string) {
    if (localStorage[key]) {
      return JSON.parse(localStorage.getItem(key) ?? "")
    }
    return null;
  }

  setLocalStorageItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  findTotalScoreFromType(type: EducationScoreType | string) {
    if (type == EducationScoreType.CGPA) {
      return 4;
    } else if (type == EducationScoreType.GPA) {
      return 5;
    }
    return null;
  }
}
