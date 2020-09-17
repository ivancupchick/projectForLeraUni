import { Component, OnInit } from '@angular/core';
import { ViewerService } from 'src/app/service/viewer.service';
import { Router } from '@angular/router';
import {MainService, TextResponse} from '../../service/main.service';

@Component({
  selector: 'app-annotated-viewer',
  templateUrl: './annotated-viewer.component.html',
  styleUrls: ['./annotated-viewer.component.css']
})
export class AnnotatedViewerComponent implements OnInit {
  public text: TextResponse;
  tagList: any[];
  tags: string[];

  constructor(private viewerService: ViewerService,
              private mainService: MainService,
              private router: Router) { }

  ngOnInit() {
    this.tagList = ['CC', 'CD', 'DT', 'EX', 'FW', 'IN', 'JJ', 'JJR', 'JJS', 'LS', 'MD', 'NN',
      'NNS', 'NNP', 'NNPS', 'PDT', 'POS', 'PRP', 'PRP$', 'RB', 'RBR', 'RBS', 'RP', 'SYM', 'TO',
      'UH', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'WDT', 'WP', 'WP$', 'WRB'];
    this.tags = [];
    for (let i = 0; i < this.tagList.length; i++) {
      this.tags.push(this.tagList[i]);
    }
    const textContent = this.viewerService.getTextContent();
    if (!textContent || !textContent.data) {
      this.router.navigateByUrl('annotated-text');
      return;
    }

    const content = textContent.data;
    this.text = this.viewerService.getTextContent();
  }

  editText() {
    this.mainService.saveAnnotatedText(this.text).subscribe((res) => {
      this.router.navigateByUrl('annotated-text');
    });
  }

  cancelEdit() {
    this.router.navigateByUrl('annotated-text');
  }
}
