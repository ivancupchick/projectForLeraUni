import { Component, OnInit, OnDestroy } from '@angular/core';
import {MainService, GetTextsResponse, TextResponse, Statistics} from 'src/app/service/main.service';
import { ViewerService } from 'src/app/service/viewer.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-annotated-text',
  templateUrl: './annotated-text.component.html',
  styleUrls: ['./annotated-text.component.css']
})
export class AnnotatedTextComponent implements OnInit, OnDestroy {
  public texts: any[];
  currentPage = 0;
  maxPage = 10;
  getTexts$: Subscription;

  constructor(
    private service: MainService,
    private viewerService: ViewerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setTexts();
  }

  ngOnDestroy() {
    if (this.getTexts$) {
      this.getTexts$.unsubscribe();
    }
  }

  setTexts() {
    if (this.getTexts$) {
      this.getTexts$.unsubscribe();
    }

    const input: any = document.getElementById('page');

    input.value = (this.currentPage + 1);

    this.getTexts$ = this.service.getAnnotatedTexts(this.currentPage)
      .subscribe((res: GetTextsResponse) => {
        this.texts = res.content;
        console.log(res);
        this.maxPage = res.totalPages;
      });
  }

  forward() {
    if (this.currentPage !== (this.maxPage - 1)) {
      this.currentPage += 1;
      this.setTexts();
    } else {
      alert('This is the last page');
    }
  }

  back() {
    if (this.currentPage !== 0) {
      this.currentPage -= 1;
      this.setTexts();
    } else {
      alert('This is the first page');
    }
  }

  setData(text: TextResponse) {
    this.viewerService.setText(text);
    this.router.navigateByUrl('annotated-viewer');
  }

  getStatistics() {
    this.getStatisticsByType('TAG');
    this.getStatisticsByType('BI_GRAM');
    this.getStatisticsByType('WORD_TAG');
  }

  getStatisticsByType(statisticsType: string) {
    this.service.getStatisticsFromAnnotatedText(statisticsType)
      .subscribe((res: Statistics) => {
        switch (statisticsType) {
          case 'TAG':
            this.viewerService.setTagStatistics(res);
            break;
          case 'BI_GRAM':
            this.viewerService.setBiGramStatistics(res);
            break;
          case 'WORD_TAG':
            this.viewerService.setWordTagStatistics(res);
            break;
        }
        this.router.navigateByUrl('statistics-viewer');
      });
  }
}
