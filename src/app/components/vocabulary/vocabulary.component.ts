import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { MainService, VocabularyResponse, WordResponse } from 'src/app/service/main.service';



@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css']
})
export class VocabularyComponent implements OnInit {
  public words: WordResponse[];

  sortOrder = true;
  previosSortBy: 'word' | 'frequency' = 'word';

  currentPage = 0;
  displayPage = 1;

  maxPage = 10;

  constructor(private service: MainService) { }

  ngOnInit() {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin':  'http://localhost:4200',
    //     // 'Access-Control-Max-Age': '86400'
    //   }),
    //   // responseType: 'json',
    //   // withCredentials: true,

    // };

    this.setWords();
  }

  setWords(sortBy: 'word' | 'frequency' = (this.previosSortBy || 'word'), change: boolean = false) {
    if (change) {
      this.sortOrder = !this.sortOrder;
    }
    this.previosSortBy = sortBy;

    const input: any = document.getElementById('page');

    input.value = (this.currentPage + 1);

    this.service.getWords(this.currentPage, sortBy, this.sortOrder)
      .subscribe((res: VocabularyResponse) => {
        this.words = res.content;

        this.maxPage = res.totalPages;
      });
  }

  forward() {
    if (this.currentPage !== this.maxPage) {
      this.currentPage += 1;
      this.setWords();
    } else {
      alert('Это последняя страница');
    }
  }

  back() {
    if (this.currentPage !== 0) {
      this.currentPage -= 1;
      this.setWords();
    } else {
      alert('Это первая страница');
    }
  }
}
