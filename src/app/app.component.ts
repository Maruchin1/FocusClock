import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SetupDialogComponent} from './setup-dialog/setup-dialog.component';
import {ClockService} from './clock.service';
import {DoneDialogComponent} from './done-dialog/done-dialog.component';
import {ImagesService} from './images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public clockService: ClockService,
    public imagesService: ImagesService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.clockService.isDone.subscribe(value => {
      if (value) {
        this.openDoneDialog();
      }
    });
    this.imagesService.startImagesLoop();
  }

  ngOnDestroy(): void {
    this.clockService.cancel();
    this.imagesService.stopImagesLoop();
  }

  openSetupDialog() {
    this.matDialog.open(SetupDialogComponent, {
      width: '500px',
    });
  }

  openDoneDialog() {
    this.matDialog.open(DoneDialogComponent);
  }
}
