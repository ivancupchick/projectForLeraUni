import { Component, OnInit } from '@angular/core';
import { ViewerService } from 'src/app/service/viewer.service';
import { Router } from '@angular/router';
import {MainService, Sort, Statistics, TextResponse} from '../../service/main.service';

@Component({
  selector: 'app-statistics-viewer',
  templateUrl: './statistics-viewer.component.html',
  styleUrls: ['./statistics-viewer.component.css']
})
export class StatisticsViewerComponent implements OnInit {
  public text: TextResponse;
  tagStatistics: Statistics;
  biGramStatistics: Statistics;
  wordTagStatistics: Statistics;
  tagStatSort: Sort;
  biGramStatSort: Sort;
  wordStatSort: Sort;

  constructor(private viewerService: ViewerService,
              private mainService: MainService,
              private router: Router) { }

  ngOnInit() {
    const tagStatistics = this.viewerService.getTagStatistics();
    const biGramStatistics = this.viewerService.getBiGramStatistics();
    const wordTagStatistics = this.viewerService.getWordTagStatistics();
    if (!tagStatistics || !biGramStatistics || !wordTagStatistics) {
      this.cancel();
      return;
    }
    this.tagStatistics = tagStatistics;
    this.biGramStatistics = biGramStatistics;
    this.wordTagStatistics = wordTagStatistics;
    this.tagStatSort = { order: false, field: 'frequency' };
    this.biGramStatSort = { order: false, field: 'frequency' };
    this.wordStatSort = { order: false, field: 'frequency' };
  }

  public cancel() {
    this.router.navigateByUrl('annotated-text');
  }

  public changeTagSort(sortField: string) {
    this.tagStatSort = {order: !this.tagStatSort.order, field: sortField};
    this.mainService.getStatisticsFromAnnotatedText('TAG', this.tagStatSort.field, this.tagStatSort.order)
      .subscribe((res: Statistics) => {
        this.viewerService.setTagStatistics(res);
        this.tagStatistics = this.viewerService.getTagStatistics();
      });
  }

  public changeBiGramSort(sortField: string) {
    this.biGramStatSort = {order: !this.biGramStatSort.order, field: sortField};
    this.mainService.getStatisticsFromAnnotatedText('BI_GRAM', this.biGramStatSort.field, this.biGramStatSort.order)
      .subscribe((res: Statistics) => {
        this.viewerService.setBiGramStatistics(res);
        this.biGramStatistics = this.viewerService.getBiGramStatistics();
      });
  }

  public changeWordTagSort(sortField: string) {
    this.wordStatSort = {order: !this.wordStatSort.order, field: sortField};
    this.mainService.getStatisticsFromAnnotatedText('WORD_TAG', this.wordStatSort.field, this.wordStatSort.order)
      .subscribe((res: Statistics) => {
        this.viewerService.setWordTagStatistics(res);
        this.wordTagStatistics = this.viewerService.getWordTagStatistics();
      });
  }
}
