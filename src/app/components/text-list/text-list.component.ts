import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService, GetTextsResponse } from 'src/app/service/main.service';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent implements OnInit {
  public texts: any[];

  sortOrder = true;

  public file: File;

  currentPage = 0;
  displayPage = 1;

  maxPage = 10;

  constructor(private service: MainService) { }

  ngOnInit() {
    this.setTexts();
  }

  setTexts() {
    const input: any = document.getElementById('page');

    input.value = (this.currentPage + 1);

    this.service.getTexts(this.currentPage)
      .subscribe((res: GetTextsResponse) => {
        this.texts = res.content;
        console.log(res);

        this.maxPage = res.totalPages;
      });
  }

  forward() {
    if (this.currentPage !== this.maxPage) {
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

  fileEvent(fileInput: InputEvent) {
    const file = (fileInput.target as any).files[0];

    if (!file) {
      return;
    }

    const fileName: string = file.name;
    const extensions = fileName.substr(fileName.length - 4);

    console.log(extensions);

    if (extensions !== '.txt') {
      this.file = null;
      alert('Поле принимает только файлы с расширение .txt ');
      return;
    }

    this.service.uploadFile(file)
      .subscribe(res => {
        console.log(res);

        alert('Файл успешно загружен!');
        this.file = null;
      }, (error) => {
        console.log(error);

        this.file = null;
      });
  }
}
