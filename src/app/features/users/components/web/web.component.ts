import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponent {}
