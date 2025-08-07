import { Component, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { PortfolioData } from '../../interfaces/portfolio-data';
import { MatCardModule } from '@angular/material/card';
import { GeneralInfoComponent } from "./general-info/general-info.component";
import { JsonPipe } from '@angular/common';
import { EducationComponent } from "./education/education.component";
import { ExperienceComponent } from "./experience/experience.component";
import { EducationScoreType } from '../../enums/education-score-type';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTabsModule, MatCardModule, GeneralInfoComponent, MatTabGroup, EducationComponent, ExperienceComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @ViewChild(MatTabGroup) matTabGroup?: MatTabGroup;

  formData: PortfolioData = {
    general: {
      name: "",
      email: "",
      phone: "",
      about: "",
      links: []
    },
    education: [
      {
        institutionName: '',
        scoreType: EducationScoreType.GPA,
        score: 0,
        totalScore: 0,
        institutionPlaceholder: 'School (or equivalent)',
        subjectPlaceholder: 'Ex: SSC (Science)',
        startDate: null,
        isCurrentlyIn: false
      },
      {
        institutionName: '',
        scoreType: EducationScoreType.GPA,
        score: 0,
        totalScore: 0,
        institutionPlaceholder: 'College (or equivalent)',
        subjectPlaceholder: 'Ex: HSC (Science)',
        startDate: null,
        isCurrentlyIn: false
      },
      {
        institutionName: '',
        scoreType: EducationScoreType.CGPA,
        score: 0,
        totalScore: 0,
        institutionPlaceholder: 'University (or equivalent)',
        subjectPlaceholder: 'Usually for Uni level',
        startDate: null,
        isCurrentlyIn: false
      },
    ]
  }
  selectedIndex: number = 0;

  constructor() {
  }

  previousStep() {
    this.selectedIndex -= 1;
  }

  nextStep() {
    if (this.selectedIndex < (this.matTabGroup?._allTabs.length ?? 0) - 1) {
      this.selectedIndex += 1;
    }
  }
}