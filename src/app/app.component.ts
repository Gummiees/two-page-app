import { Component, OnDestroy } from '@angular/core';
import { OverlayService } from '@shared/services/overlay.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'two-page-app';
  public overlay$: Observable<boolean>;
  private subscription?: Subscription;

  constructor(private overlayService: OverlayService) {
    this.overlay$ = this.overlayService.overlay$;

    this.overlay$.subscribe((val) => {
      console.log('value emitted!', val);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
