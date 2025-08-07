import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GeneralInfo } from '../../../interfaces/general-info';
import { WebLink } from '../../../interfaces/web-link';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent {
  @Input({ required: true }) generalInfo: GeneralInfo = {
    name: '',
    links: []
  };

  addAdditionalLink() {
    let webLink: WebLink = {
      title: "",
      link: ""
    }

    this.generalInfo.links.push(webLink);
  }

  removeLink(index: number) {
    this.generalInfo.links.splice(index, 1);
  }
}
