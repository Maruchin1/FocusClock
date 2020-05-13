import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ClockService, ClockSetup} from '../clock.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-setup-dialog',
  templateUrl: './setup-dialog.component.html',
  styleUrls: ['./setup-dialog.component.css']
})
export class SetupDialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private clockService: ClockService,
    private dialogRef: MatDialogRef<SetupDialogComponent>
  ) {
  }

  private setup = this.clockService.getSetup();

  form = this.formBuilder.group({
    study: [this.setup.study, Validators.required],
    pause: [this.setup.pause, Validators.required],
    series: [this.setup.series, Validators.required]
  });

  ngOnInit(): void {
  }

  save() {
    const newSetup: ClockSetup = {
      study: this.form.get('study').value,
      pause: this.form.get('pause').value,
      series: this.form.get('series').value
    };
    this.clockService.changeSetup(newSetup);
    this.dialogRef.close();
  }
}
