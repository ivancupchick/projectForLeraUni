import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  GetTextsResponse,
  MainService,
  TextResponse,
  VocabularyResponse,
  WordCanonicalResponse,
  WordResponse
} from 'src/app/service/main.service';
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
  texts: TextResponse[];

  searchValue: string;

  getWords$: Subscription;

  constructor(private service: MainService) { }

  ngOnInit() {
    this.setWords();
    this.service.getTexts(this.currentPage)
      .subscribe((res: GetTextsResponse) => {
        this.texts = res.content;
      });
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
        this.words.forEach(word => {
          word.editedValue = word.word;
          word.editTag = word.tag;
        });

        this.maxPage = res.totalPages;
      });
  }

  forward() {
    if (this.currentPage !== this.maxPage) {
      this.currentPage += 1;
      this.setWords();
    } else {
      alert('This is the last page');
    }
  }

  back() {
    if (this.currentPage !== 0) {
      this.currentPage -= 1;
      this.setWords();
    } else {
      alert('This is the first page');
    }
  }

  searchWord() {
    this.service.searchWord(this.searchValue)
      .subscribe((res: VocabularyResponse) => {
        this.words = res.content;

        this.maxPage = res.totalPages;
      });
  }

  editWord(word) {
    this.service.editWord(word.word, word.editedValue, word.mentions)
      .subscribe((res: VocabularyResponse) => {
        alert('Word has been changed successfully!');
        word.editedValue = null;
        window.location.reload();
      });
  }

  editTag(word) {
    this.service.editTag(word.word, word.editTag)
      .subscribe((res: VocabularyResponse) => {
        alert('Tag has been changed successfully!');
        window.location.reload();
      });
  }

  getCanonical(word) {
    if (word.wordCanonical) {
      word.wordCanonical = null;
      return;
    }
    this.service.getCanonical(word.word)
      .subscribe((res: WordCanonicalResponse) => {
        word.wordCanonical = res;
        // alert('canonical from: ' + res.canonical + '\n'
        //   + 'tags: ' + res.tags + '\n'
        //   + 'frequency: ' + res.frequency + '\n');
      });
  }

  getTextVocabulary(textId) {
    this.service.getTextVocabulary(textId, this.currentPage, 'word', this.sortOrder)
      .subscribe((res: VocabularyResponse) => {
        this.words = res.content;
        this.words.forEach(word => {
          word.editedValue = word.word;
          word.editTag = word.tag;
        });
        this.maxPage = res.totalPages;
      });
  }
}
