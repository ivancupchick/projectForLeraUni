import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface Mention {
  id: number; // text ID
  data: any; // what is it?
  name: string; // text Title
}

export interface WordResponse {
  frequency: number;
  word: string;
  mentions: Mention[];
}

export interface TextResponse {
  data: string;
  id: number;
  name: string;
}

export interface VocabularyResponse {
  content: WordResponse[]; //  (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number; /// 20
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface GetTextsResponse {
  content: TextResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private baseUrl = environment.origin;

  constructor(private http: HttpClient) { }

  getWords(page: number, sortBy: 'word' | 'frequency' = 'word', sortOrder: boolean, totalRecords: number = 20) {
    const url = `${this.baseUrl}/vocabulary?page=${page}&size=${totalRecords}&sort=${sortBy},${sortOrder ? 'asc' : 'desc'}`;

    return this.http.get(url)
      .pipe(
        take(1)
      );
  }

  getTexts(page: number, totalRecords: number = 20) {
    const url = `${this.baseUrl}/text?page=${page}&size=${totalRecords}`;

    return this.http.get(url)
      .pipe(
        take(1)
      );
  }

  searchWord(word: string) {
    const url = `${this.baseUrl}/vocabulary/${word}`;

    // 'https://valerija-nlp.herokuapp.com/vocabulary/english/?page=0&size=2&sort=frequency,desc'

    return this.http.get(url)
      .pipe(
        take(1)
      );
  }

  uploadFile(file: File): Observable<any> {
    const url = `${this.baseUrl}/text`;

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(url, formData)
      .pipe(
        take(1)
      );
  }
}
