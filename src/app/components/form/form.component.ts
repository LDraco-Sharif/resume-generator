import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formData: PortfolioData = {
    general: {
      name: "",
      email: "",
      phone: "",
      about: "",
      links: []
    }
  }

  constructor(private commonService: CommonServiceService) {}

  addAdditionalLink() {
    let webLink: WebLink = {
      title: "",
      link: "" 
    }

    this.formData.general.links.push(webLink);
  }

  removeLink(index: number) {
    this.formData.general.links.splice(index, 1);
  }
}

interface PortfolioData {
  general: {
    name: string,
    email?: string,
    phone?: string,
    about?: string,
    links: WebLink[]
  }
}

interface WebLink {
  title?: string,
  link: string
}
