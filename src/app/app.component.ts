import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, RouterLink, RouterModule, MatAnchor, MatButtonModule, MatSidenavModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav?: MatSidenav;
  title = 'resume-generator';

  closeSideNav () {
    setTimeout(() => {
      this.sidenav?.close();
    }, 0);
  }
}
