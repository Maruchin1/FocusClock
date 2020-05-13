import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export interface ClockSetup {
  study: number;
  pause: number;
  series: number;
}

export interface Time {
  minutes: string;
  seconds: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  constructor() {
  }

  private readonly STUDY_CYCLE = 'Nauka';
  private readonly PAUSE_CYCLE = 'Przerwa';
  private setup: ClockSetup = {
    study: 25,
    pause: 5,
    series: 2
  };

  private secondInterval;
  private secondsTimer = new BehaviorSubject(this.setup.study * 60);
  private currCycle = new BehaviorSubject(this.STUDY_CYCLE);
  private currSeriesNumber = new BehaviorSubject(1);
  private doneEvent = new BehaviorSubject(false);

  isCounting = false;
  cycleName: Observable<string> = this.currCycle.asObservable();
  numOfSeries: Observable<number> = this.currSeriesNumber.asObservable();
  isDone: Observable<boolean> = this.doneEvent.asObservable();
  time: Observable<Time> = this.secondsTimer.asObservable().pipe(
    map((seconds) => this.secondsToTime(seconds))
  );

  getSetup(): ClockSetup {
    return this.setup;
  }

  changeSetup(setup: ClockSetup) {
    this.setup = setup;
    this.cancel();
  }

  begin() {
    this.secondInterval = setInterval(() => {
      if (this.isCurrCycleDone()) {
        if (this.isLastStudyCycle()) {
          this.doneEvent.next(true);
          this.cancel();
        } else {
          this.switchCycle();
        }
      } else {
        this.timerStep();
      }
    }, 1000);
    this.isCounting = true;
  }

  cancel() {
    this.isCounting = false;
    clearInterval(this.secondInterval);
    this.doneEvent.next(false);
    this.secondsTimer.next(this.setup.study * 60);
    this.currCycle.next(this.STUDY_CYCLE);
    this.currSeriesNumber.next(1);
  }

  private isCurrCycleDone(): boolean {
    return this.secondsTimer.value === 0;
  }

  private isLastStudyCycle(): boolean {
    const isStudy = this.currCycle.value === this.STUDY_CYCLE;
    const isLastSeries = this.currSeriesNumber.value === this.setup.series;
    return isStudy && isLastSeries;
  }

  private timerStep() {
    const currSecond = this.secondsTimer.value;
    const newSecond = currSecond - 1;
    this.secondsTimer.next(newSecond);
  }

  private switchCycle() {
    if (this.currCycle.value === this.STUDY_CYCLE) {
      this.secondsTimer.next(this.setup.pause * 60);
      this.currCycle.next(this.PAUSE_CYCLE);
    } else if (this.currCycle.value === this.PAUSE_CYCLE) {
      this.secondsTimer.next(this.setup.study * 60);
      this.currCycle.next(this.STUDY_CYCLE);
      this.currSeriesNumber.next(this.currSeriesNumber.value + 1);
    }
  }

  private secondsToTime(timerSeconds: number): Time {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = Math.floor(timerSeconds % 60);
    return {
      minutes: this.timePartToString(minutes),
      seconds: this.timePartToString(seconds)
    };
  }

  private timePartToString(value: number): string {
    if (value < 10) {
      return '0' + value.toString();
    } else {
      return value.toString();
    }
  }
}
