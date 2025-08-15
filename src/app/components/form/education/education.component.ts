import { Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EducationInfo } from '../../../interfaces/education-info';
import { EducationScoreType } from '../../../enums/education-score-type';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-education',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatRadioModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule, MatCardModule, MatDatepickerModule, MatCheckboxModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  @Input({required: true}) education: EducationInfo[] = [];

  get scoreEnumOptions() {
    return Object.keys(EducationScoreType);
  }

  constructor(public commonService: CommonService) {
  }

  addEducationalInfo() {
    let eduInfo: EducationInfo = {
      institutionName: '',
      scoreType: EducationScoreType.GPA,
      score: 0,
      totalScore: this.commonService.findTotalScoreFromType(EducationScoreType.GPA) ?? 0,
      startDate: null,
      isCurrentlyIn: false
    };
    this.education.push(eduInfo);
  }

  removeEducation(index: number) {
    this.education.splice(index, 1);
  }
}