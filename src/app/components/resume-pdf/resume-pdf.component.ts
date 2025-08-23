import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';
import { PortfolioData } from '../../interfaces/portfolio-data';
import { DecimalPipe, formatNumber, getLocaleId } from '@angular/common';

@Component({
  selector: 'app-resume-pdf',
  standalone: true,
  imports: [MatButtonModule],
  providers: [DecimalPipe],
  templateUrl: './resume-pdf.component.html',
  styleUrl: './resume-pdf.component.css'
})
export class ResumePdfComponent implements OnInit {
  constructor(private commonService: CommonService, private sanitizer: DomSanitizer, private decimapPipe: DecimalPipe) { }

  resumeStorageName = "RESUME";
  data?: PortfolioData | null;
  file?: TCreatedPdf;
  fileUrl?: SafeResourceUrl;
  isLoading: boolean = false;
  ngOnInit(): void {
    this.data = this.commonService.getLocalStorageItem(this.resumeStorageName);

    if (this.data) {
      this.showPDF();
    }
  }

  async showPDF() {
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
      },
      Tinos: {
        normal: `https://fonts.cdnfonts.com/s/16056/Tinos-Regular.woff`,   // Path to your normal font file (e.g., .ttf or .otf)
        bold: `https://fonts.cdnfonts.com/s/16056/Tinos-Bold.woff`, // Path to the bold font file (e.g., .ttf or .otf)
        italics: `https://fonts.cdnfonts.com/s/16056/Tinos-Italic.ttf`, // Path to the italic font file (if available)
        bolditalics: `https://fonts.cdnfonts.com/s/16056/Tinos-BoldItalic.ttf` // Path to the bold italic font file (if available)
      },
      Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
      }
    };
    pdfMake.fonts = fonts;

    let contactLinks = this.data?.general?.links.map(l => {

      if (l.title && l.link) {
        return {
          text: l.title ?? "",
          link: l.link
        }
      }
      else if (l.link) {
        return l.link;
      }
      else {
        return ""
      }
    }).filter(i => i);

    let contactInfo: ({ text: string, link: string } | string)[] = [
      {
        text: this.data?.general?.email ?? "",
        link: this.data?.general?.email ? ('mailto:' + this.data?.general?.email) : ''
      },
      {
        text: this.data?.general?.phone ?? "",
        link: this.data?.general?.phone ? ('tel:' + this.data?.general?.phone) : ''
      }
    ].filter(c => c.text);

    contactInfo = [...contactInfo, ...contactLinks ?? []]


    let docDefinition: any = {
      content: [
        // Header Section
        {
          text: this.data?.general.name,  // Name
          style: 'header'
        },
        {
          text: [
            ...contactInfo.map((ci, index) => {
              let returnStrucure: any = ci;

              if (index < contactInfo.length - 1) {
                returnStrucure = [ci, " | "];
              }
              return returnStrucure;
            }).flat()
          ],
          style: 'contactInfo'
        },
        ...this.sectionHeader('Profile', !!this.data?.general.about),
        {
          text:
            this.data?.general.about,
          margin: [0, 0, 0, 5]
        },
        {
          stack: !this.data?.experiences.length ? [] : [
            ...this.sectionHeader('Work Experience'),
            this.data?.experiences.map(e => {
              return [
                {
                  columns: [
                    {
                      text: [
                        {
                          text: e.role, bold: true
                        },
                        ', ',
                        {
                          text: e.company
                        },
                        ' - ',
                        e.location
                      ],
                      width: '*',
                    },
                    {
                      text: `${this.dateFormatter(e.startDate, e.ignoreMonth, e.ignoreDate)} - ${this.dateFormatter(e.endDate, e.ignoreMonth, e.ignoreDate) ?? 'Present'}`,
                      width: 'auto'
                    }
                  ],
                },
                {
                  ul: [
                    ...e.responsibilities
                  ],
                  margin: [0, 0, 0, 3]
                }
              ]
            }).reverse().flat(),
          ],
          unbreakable: true
        },
        {
          stack: !this.data?.education.length ? [] : [
            ...this.sectionHeader('Education'),
            this.data?.education.map(e => {
              return [
                {
                  columns: [
                    {
                      text: [
                        {
                          text: e.institutionName, bold: true
                        }
                      ],
                      width: '*',
                    },
                    {
                      text: `${this.dateFormatter(e.startDate, e.ignoreMonth, e.ignoreDate)} - ${this.dateFormatter(e.endDate, e.ignoreMonth, e.ignoreDate) ?? 'Present'}`,
                      width: 'auto'
                    }
                  ],
                },
                { text: e.subject, margin: [0, 2, 0, 0] },
                {
                  ul: [
                    {
                      text: [
                        {
                          text: e.scoreType, bold: true
                        },
                        ': ',
                        this.decimapPipe.transform(e.score, '1.1-2'),
                        '/',
                        this.decimapPipe.transform(e.totalScore, '1.1-2'),
                      ]
                    }
                  ],
                  margin: [0, 0, 0, 3]
                }
              ]
            }).reverse().flat(),
          ],
          unbreakable: true
        },
        {
          stack: !this.data?.projectTech.projects.length ? [] : [
            ...this.sectionHeader('Projects'),
            this.data?.projectTech.projects.map(p => {
              return [
                {
                  columns: [
                    {
                      text: [
                        {
                          text: p.name, bold: true
                        }
                      ],
                      width: '*',
                    },
                    {
                      text: [
                        ...p.links
                          .filter(l => l.link)
                          .map((l, index) => {
                            let returnStrucure: any = {
                              text: l.title,
                              link: l.link
                            }
                            if (index < p.links.length - 1) {
                              returnStrucure = [returnStrucure, " | "];
                            }
                            return returnStrucure;
                          }).flat()
                      ],
                      width: 'auto'
                    }
                  ],
                },
                {
                  ul: [
                    ...p.descriptions,
                    {
                      text: !p.techs.length ? [] : [
                        {
                          text: "Tools Used: ",
                          bold: true
                        },
                        ...p.techs.join(", ")
                      ]
                    }
                  ],
                  margin: [0, 0, 0, 3]
                }
              ]
            }).flat(),
          ],
          unbreakable: true
        },
        {
          stack: !this.data?.publications.length ? [] : [
            ...this.sectionHeader('Publications'),
            this.data?.publications.map(p => {
              return [
                {
                  columns: [
                    {
                      text: p.title, bold: true
                    },
                    {
                      text: `${this.dateFormatter(p.date, p.ignoreMonth, p.ignoreDate)}`,
                      width: 'auto'
                    }
                  ],
                },
                {
                  text: p.authors.join(", ")
                },
                {
                  text: p.doi,
                  link: "https://doi.org/" + p.doi,
                  margin: [0, 0, 0, 3]
                }
              ]
            }).flat(),
          ],
          unbreakable: true
        },
        {
          stack: !this.data?.certifications.length ? [] : [
            ...this.sectionHeader('Certifications'),
            {
              ul: [
                ...this.data?.certifications
              ]
            }
          ],
          unbreakable: true
        },
        {
          stack: !((this.data?.projectTech?.tech?.languages?.length ?? 0)
            + (this.data?.projectTech.tech.frameworks.length ?? 0)
            + (this.data?.projectTech.tech.software.length ?? 0)) ? [] : [
            ...this.sectionHeader('Technologies'),
            {
              text: [
                {
                  text: "Languages: ",
                  bold: true
                },
                this.data?.projectTech.tech.languages.join(", ")
              ],
              margin: [0, 0, 0, 3]
            },
            {
              text: [
                {
                  text: "Frameworks/Libraries: ",
                  bold: true
                },
                this.data?.projectTech.tech.frameworks.join(", ")
              ],
              margin: [0, 0, 0, 3]
            },
            {
              text: [
                {
                  text: "Softwares: ",
                  bold: true
                },
                this.data?.projectTech.tech.software.join(", ")
              ],
              margin: [0, 0, 0, 3]
            }
          ],
          unbreakable: true
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 0]
        },
        contactInfo: {
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 0]
        },
        sectionHeader: {
          fontSize: 13,
          bold: true,
          margin: [0, 10, 0, 2]
        }
      },
      defaultStyle: {
        font: 'Tinos'
      },
    };

    this.file = pdfMake.createPdf(docDefinition);
    // this.file.open();
    this.isLoading = true;
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL((await (this.file as any).getBlob())) + '#toolbar=0&navpanes=0');
    this.isLoading = false;
  }

  generatePDF() {
    if (this.file) {
      // this.file.open();
      this.file.download('Resume.pdf');
    }
  }

  dateFormatter(date: string | Date | undefined | null, ignoreMonth: boolean = false, ignoreDate: boolean = false) {
    if (!date) {
      return null;
    }
    return new Intl.DateTimeFormat('en-Us', {
      month: ignoreMonth ? undefined : 'short',
      day: ignoreMonth || ignoreDate ? undefined : '2-digit',
      year: 'numeric'
    }).format(new Date(date ?? ""));
  }

  sectionHeader(title: string, show: boolean = true) {
    if (!show) {
      return [];
    }

    return [
      { text: title, style: 'sectionHeader' },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.1 }],
        margin: [0, 0, 0, 3]
      },
    ];
  }
}

