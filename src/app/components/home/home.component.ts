import { Component, OnInit } from '@angular/core';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { CommonService } from '../../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatAnchor, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  localResumeExists = false;
  resumeStorageName = "RESUME";
  constructor(private commonService: CommonService, private snack: MatSnackBar) { }
  ngOnInit(): void {
    this.localResumeExists = this.commonService.getLocalStorageItem(this.resumeStorageName) ? true : false;
  }

  async onFileSelected(event: any) {
    try {
      let resumeFile = event?.target?.files[0];
      let fileReader = new FileReader();
      let resumeData: any = "";
      if (resumeFile) {
        fileReader.onload = () => {
          resumeData = fileReader.result;
          this.commonService.setLocalStorageItem(this.resumeStorageName, resumeData);
          this.snack.open("Import Successful.", undefined, {
            duration: 500,
            panelClass: ['bg-green']
          });

          this.localResumeExists = true;
        };

        fileReader.readAsText(resumeFile);
      }

      event.target.value = "";
    }
    catch {
      this.snack.open("Import Failed.", undefined, {
        duration: 500,
        panelClass: ['bg-red']
      });
    }
  }
}
