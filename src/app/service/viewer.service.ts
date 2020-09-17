import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {TextResponse, Statistics} from './main.service';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  private textContent = new BehaviorSubject<TextResponse>(null);
  private tagStatistics = new BehaviorSubject<Statistics>(null);
  private biGramStatistics = new BehaviorSubject<Statistics>(null);
  private wordTagStatistics = new BehaviorSubject<Statistics>(null);

  constructor() { }

  public setText(text: TextResponse) {
    this.textContent.next(text);
  }

  public getTextContent(): TextResponse {
    return this.textContent.getValue();
  }

  public setTagStatistics(statistics: Statistics) {
    this.tagStatistics.next(statistics);
  }

  public getTagStatistics(): Statistics {
    return this.tagStatistics.getValue();
  }

  public setBiGramStatistics(statistics: Statistics) {
    this.biGramStatistics.next(statistics);
  }

  public getBiGramStatistics(): Statistics {
    return this.biGramStatistics.getValue();
  }

  public setWordTagStatistics(statistics: Statistics) {
    this.wordTagStatistics.next(statistics);
  }

  public getWordTagStatistics(): Statistics {
    return this.wordTagStatistics.getValue();
  }
}
