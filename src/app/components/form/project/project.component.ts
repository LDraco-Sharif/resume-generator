import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProjectTech } from '../../../interfaces/project-tech';
import { Project } from '../../../interfaces/project';
import { WebLink } from '../../../interfaces/web-link';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, MatFormField, MatInputModule, MatButtonModule, MatLabel, MatChipsModule, MatIconModule, MatCardModule, MatSelectModule, JsonPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  readonly separatorKeysCodes = [ENTER] as const;

  @Input({ required: true }) projectTech: ProjectTech = {
    projects: [],
    tech: {
      software: [],
      languages: [],
      frameworks: []
    }
  }

  allTechOptions: any[] = [];

  get allTechs() {
    this.allTechOptions = [...this.projectTech.tech.languages, ...this.projectTech.tech.frameworks, ...this.projectTech.tech.software];
    return this.allTechOptions;
  }

  addTech(event: MatChipInputEvent, strings: string[]) {
    let trimmedInput = event.value.trim();
    if (trimmedInput) {
      strings.push(trimmedInput);
    }
    event.chipInput!.clear();
    this.updateSelectedTechsInProjects();
  }

  updateSelectedTechsInProjects() {
    this.projectTech.projects = this.projectTech.projects.map(p => {
      let techs = p?.techs?.filter(t => this.allTechs.includes(t)) ?? [];
      return {
        ...p,
        techs: techs
      };
    });
  }

  remove(index: number, objects: any[]) {
    objects.splice(index, 1);
    this.updateSelectedTechsInProjects();
  }

  removeTechsFromProject(projIndex: number, techIndex: number) {
    this.projectTech.projects[projIndex].techs = this.projectTech.projects[projIndex].techs.filter((t, i) => i != techIndex);
  }

  addProject() {
    let project: Project = {
      name: '',
      descriptions: [],
      links: [],
      techs: []
    }
    this.projectTech.projects.push(project);
  }

  addProjectDescription(index: number) {
    this.projectTech.projects[index].descriptions.push('');
  }

  addProjectLink(index: number) {
    let link: WebLink = {
      link: ''
    }
    this.projectTech.projects[index].links.push(link);
  }
}
