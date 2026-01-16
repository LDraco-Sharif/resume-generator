import { Component, Input, ViewChild } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { Experience } from '../../../interfaces/experience';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatRadioModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule, MatCardModule, MatDatepickerModule, MatCheckboxModule, MatExpansionModule, JsonPipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  @ViewChild(NgForm) form?: NgForm;
  
  @Input({ required: true }) experiences: Experience[] = [
  ];

  addExperienceInfo() {
    let experience: Experience = {
      company: '',
      role: '',
      responsibilities: [''],
      startDate: null,
      isCurrentlyIn: false
    };

    this.experiences.push(experience);
  }

  removeExperience(index: number) {
    this.experiences.splice(index, 1);
  }

  addResponsibilityInfo(index: number) {
    this.experiences[index].responsibilities.push("");
  }

  removeResponsibility(experienceIndex: number, responsibilityIndex: number) {
    this.experiences[experienceIndex].responsibilities.splice(responsibilityIndex, 1);
  }
}
