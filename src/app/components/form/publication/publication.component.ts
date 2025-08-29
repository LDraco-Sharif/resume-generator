import { Component, Input, ViewChild } from '@angular/core';
import { Publication } from '../../../interfaces/publication';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatDatepickerModule, MatIconModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  @ViewChild(NgForm) form?: NgForm;

  @Input() publications: Publication[] = [];

  addAuthors(pubIndex: number) {
    this.publications[pubIndex].authors.push("");
  }

  addPublication() {
    let publication: Publication = {
      title: '',
      authors: [],
      doi: '',
    }
    this.publications.push(publication);
  }

  remove(index: number, objects: any[]) {
    objects.splice(index, 1);
  }
}
