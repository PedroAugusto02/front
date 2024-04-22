import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');    
  
  constructor() { }

  setPageTitle(title: string): void {
    this.pageTitleSubject.next(title);
  }

  getPageTitle(): Observable<string> {
    return this.pageTitleSubject.asObservable();
  }
}
