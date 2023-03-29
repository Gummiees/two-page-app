import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlaySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public overlay$: Observable<boolean> = this.overlaySubject.asObservable();

  public set overlay(val: boolean) {
    this.overlaySubject.next(val);
  }
}
