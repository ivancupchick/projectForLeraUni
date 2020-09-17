import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MainService, GetTextsResponse, TextResponse, VocabularyResponse} from 'src/app/service/main.service';
import { ViewerService } from 'src/app/service/viewer.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent implements OnInit, OnDestroy {
  public texts: any[];
  searchValue: string;

  sortOrder = true;

  public file: File;

  currentPage = 0;
  displayPage = 1;

  maxPage = 10;

  getTexts$: Subscription;
  uploadFile$: Subscription;

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
    if (this.uploadFile$) {
      this.uploadFile$.unsubscribe();
    }
  }

  setTexts() {
    if (this.getTexts$) {
      this.getTexts$.unsubscribe();
    }

    const input: any = document.getElementById('page');

    input.value = (this.currentPage + 1);

    this.getTexts$ = this.service.getTexts(this.currentPage)
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

  fileEvent(fileInput: any) {
    const file = (fileInput.target as any).files[0];

    if (!file) {
      return;
    }

    const fileName: string = file.name;
    const extensions = fileName.substr(fileName.length - 4);

    if (extensions !== '.txt') {
      this.file = null;
      alert('File extension should be .txt ');
      return;
    }

    this.uploadFile$ = this.service.uploadFile(file)
      .subscribe(res => {
        document.getElementsByClassName('loading-modal')[0].classList.remove('visible');
        this.setTexts();
        this.file = null;
      }, (error) => {
        document.getElementsByClassName('loading-modal')[0].classList.remove('visible');
        alert('Something went wrong...');
        console.log(error);
        this.file = null;
      });
  }

  setData(text: TextResponse) {
    this.viewerService.setText(text);
    this.router.navigateByUrl('annotated-viewer');
  }

  searchText() {
    if (!this.searchValue) {
      this.setTexts();
      return;
    }
    this.service.searchText(this.searchValue)
      .subscribe((res: GetTextsResponse) => {
        this.texts = res.content;
        this.maxPage = res.totalPages;
      });
  }
}
