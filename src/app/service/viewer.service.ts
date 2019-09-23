import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  private textContent = new BehaviorSubject<string>('');

  constructor() { }

  public setTextContent(value: string) {
    this.textContent.next(value);
  }

  public getTextContent(): string {
    return this.textContent.getValue();
  }
}
