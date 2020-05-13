import {Component, OnInit} from '@angular/core';
import {ClockService} from '../clock.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  constructor(
    public clockService: ClockService
  ) {
  }

  ngOnInit(): void {
  }

}
