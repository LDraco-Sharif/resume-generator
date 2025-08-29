import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.css'
})
export class CertificationComponent {
  @ViewChild(NgForm) form?: NgForm;

  @Input() certifications: string[] = [];

  addCertificate() {
    this.certifications.push("");
  }

  removeCertificate(index: number) {
    this.certifications.splice(index, 1);
  }
}
