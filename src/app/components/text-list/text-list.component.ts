import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService, GetTextsResponse } from 'src/app/service/main.service';
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
      alert('Это последняя страница');
    }
  }

  back() {
    if (this.currentPage !== 0) {
      this.currentPage -= 1;
      this.setTexts();
    } else {
      alert('Это первая страница');
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
      alert('Поле принимает только файлы с расширением .txt ');
      return;
    }

    this.uploadFile$ = this.service.uploadFile(file)
      .subscribe(res => {
        alert('Файл успешно загружен!');
        this.setTexts();

        this.file = null;
      }, (error) => {
        alert('Что-то пошло не так...');
        console.log(error);

        this.file = null;
      });
  }

  setData(content: string) {
    this.viewerService.setTextContent(content);

    this.router.navigateByUrl('viewer');
    // "../viewer"
  }
}
