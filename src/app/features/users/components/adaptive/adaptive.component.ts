import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-adaptive',
  templateUrl: './adaptive.component.html',
  styleUrls: ['./adaptive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveComponent {}
