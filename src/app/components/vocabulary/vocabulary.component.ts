import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService, VocabularyResponse, WordResponse } from 'src/app/service/main.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css']
})
export class VocabularyComponent implements OnInit, OnDestroy {
  public words: WordResponse[];

  sortOrder = true;
  previosSortBy: 'word' | 'frequency' = 'word';

  currentPage = 0;
  displayPage = 1;

  maxPage = 10;

  searchValue: string;

  getWords$: Subscription;

  constructor(private service: MainService) { }

  ngOnInit() {
    this.setWords();
  }

  ngOnDestroy() {
    if (this.getWords$) {
      this.getWords$.unsubscribe();
    }
  }

  setWords(sortBy: 'word' | 'frequency' = (this.previosSortBy || 'word'), change: boolean = false) {
    if (this.getWords$) {
      this.getWords$.unsubscribe();
    }

    if (change) {
      this.sortOrder = !this.sortOrder;
    }
    this.previosSortBy = sortBy;

    const input: any = document.getElementById('page');

    input.value = (this.currentPage + 1);

    this.getWords$ = this.service.getWords(this.currentPage, sortBy, this.sortOrder)
      .subscribe((res: VocabularyResponse) => {
        console.log(res.content);
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

  searchWord() {
    this.service.searchWord(this.searchValue)
      .subscribe((res: VocabularyResponse) => {
        this.words = res.content;

        this.maxPage = res.totalPages;
      });
  }
}
