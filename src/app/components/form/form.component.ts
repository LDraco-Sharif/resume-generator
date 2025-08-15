import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { PortfolioData } from '../../interfaces/portfolio-data';
import { MatCardModule } from '@angular/material/card';
import { GeneralInfoComponent } from "./general-info/general-info.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { EducationComponent } from "./education/education.component";
import { ExperienceComponent } from "./experience/experience.component";
import { EducationScoreType } from '../../enums/education-score-type';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTabsModule, MatCardModule, GeneralInfoComponent, MatTabGroup, EducationComponent, ExperienceComponent, MatStepperModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  @ViewChild(MatStepper) matTabGroup?: MatStepper;

  resumeStorageName = "RESUME";
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
    ],
    experiences: [
      {
        company: '',
        role: '',
        responsibilities: [''],
        startDate: null,
        isCurrentlyIn: false
      }
    ]
  };
  
  selectedIndex: number = 0;

  constructor(private commonService: CommonService, private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    let data = this.commonService.getLocalStorageItem(this.resumeStorageName);
    if (data) {
      this.formData = data;
    }

    this.formData.education = this.formData.education.map(e => {
      return {
        ...e,
        totalScore: this.commonService.findTotalScoreFromType(e.scoreType) ?? e.totalScore
      }
    })
  }

  previousStep() {
    this.selectedIndex -= 1;
  }

  nextStep() {
    if (this.selectedIndex < (this.matTabGroup?.steps.length ?? 0) - 1) {
      this.selectedIndex += 1;
    }
  }

  save() {
    this.formData.general.links = this.formData.general.links.filter(l => l);
    this.formData.education = this.formData.education.filter(e => e.institutionName)
      .map(e => {
        return {
          ...e,
          endDate: e.isCurrentlyIn ? null : e.endDate
        }
      });

    this.formData.experiences = this.formData.experiences.filter(e => e.company)
      .map(xp => {
        return {
          ...xp,
          endDate: xp.isCurrentlyIn ? null : xp.endDate
        }
      });
    this.formData.experiences.map(xp => {
      xp.responsibilities = xp.responsibilities.filter(r => r);
    });
    this.commonService.setLocalStorageItem(this.resumeStorageName, this.formData);
    this.snack.open("Success", undefined, {
      duration: 1000,
      panelClass: ["bg-green"]
    });
  }
}