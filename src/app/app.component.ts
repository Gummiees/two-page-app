import { Component } from '@angular/core';
import { OverlayService } from '@shared/services/overlay.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'two-page-app';
  public lang = 'es';
  public overlay$: Observable<boolean>;

  constructor(private overlayService: OverlayService) {
    this.overlay$ = this.overlayService.overlay$;
    this.lang = this.getCurrentLang();
  }

  private getCurrentLang(): string {
    const paths = location.pathname.replace('/', '').split('/');
    let path = 'en-US';
    if (paths.length && paths[0] !== '') {
      path = paths[0];
    }
    return path !== '' ? path : 'en-US';
  }

  public onChange() {
    const url = `${location.origin}/${this.lang}`;
    console.log('url', url);
    location.assign(url);
  }
}
