import {Component, EventEmitter, Input, Output} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {group} from '@angular/animations';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  modifyStyle: string;

  @Input() matButtonToggle = new EventEmitter()

  constructor(private breakpointObserver: BreakpointObserver) {}

  colorChange(value: any) {
    this.modifyStyle = value;
    console.log(this.modifyStyle);
  }
}
