import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Miscellanious } from '../../../classes/miscellanious';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './others.component.html',
  styleUrl: './others.component.css'
})
export class OthersComponent {
  @ViewChild(NgForm) form?: NgForm;
  
  @Input({ required: true }) miscList: Miscellanious[] = [
  ];

  addMisc() {
    let misc: Miscellanious = new Miscellanious();

    this.miscList.push(misc);
  }

  removeMisc(index: number) {
    this.miscList.splice(index, 1);
  }

  addOption(index: number) {
    this.miscList[index].options.push("");
  }

  removeOption(experienceIndex: number, responsibilityIndex: number) {
    this.miscList[experienceIndex].options.splice(responsibilityIndex, 1);
  }
}
