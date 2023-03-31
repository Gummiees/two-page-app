import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { OverlayService } from '@shared/services/overlay.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public title = 'two-page-app';
  public lang = 'es';
  public overlay$: Observable<boolean>;
  private subscription?: Subscription;

  constructor(private overlayService: OverlayService, private location: Location) {
    this.overlay$ = this.overlayService.overlay$;
    this.lang = this.getCurrentLang();
  }

  private getCurrentLang(): string {
    const path = this.location.path();
    return path !== '' ? path : 'en-US';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public onChange() {
    console.log('onChange', this.lang);
    this.location.replaceState(this.lang);
  }
}
