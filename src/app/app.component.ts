import { Component } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-timer';

  public stopTimer: boolean = false;

  public startDate = 0;
  public currentTimer = 0;
  public stoppedTime = 0;

  public toPrintTime = "00 : 00 : 00";

  // Check if the timer is already running
  public timerRunning = false;

  // Array of saved times
  public savedTimes: Array<number> = [];

  public timer: any;

  public msgInfo = "";

  BtnStartTimer(): void
  {
    if (!this.timerRunning)
    {
      // If the timer got reseted or never started
      if (this.startDate === 0)
      {
        this.startDate = new Date().getTime();
      }
      // If the timer is resumed
      else
      {
        this.startDate = new Date().getTime() - this.stoppedTime;
      }
      this.timerRunning = true;
      this.timer = setInterval(() => 
      {
        this.currentTimer = new Date().getTime() - this.startDate;

        this.toPrintTime = this.GetTimeFormat(this.currentTimer);
      }, 10);
      this.msgInfo = "Chronomètre démarré/redémarré";
    }
  }

  BtnStopTimer(): void
  {
    clearInterval(this.timer);
    this.timerRunning = false;
    this.stoppedTime = this.currentTimer;
    this.msgInfo = "Chronomètre mis en pause";
  }

  // Save the current time of the timer in savedTimes
  BtnSaveTime(): void
  {
    this.savedTimes.push(this.currentTimer);
    this.msgInfo = "Temps sauvegardé";
  }

  BtnResetTimer(): void
  {
    this.BtnStopTimer();
    this.startDate = 0;
    this.toPrintTime = this.GetTimeFormat(0);
    this.currentTimer = 0;
    this.msgInfo = "Chronomètre remis à 0";
  }

  // Format a number in format (string) : hh : mm : ss
  GetTimeFormat(numberTime: number): string
  {
    let toReturnTime = "";

    let nbHours = Math.floor(numberTime / 3600000);
    let nbMinutes = Math.floor(numberTime / 60000) % 60;
    let nbSeconds = Math.floor(numberTime / 1000) % 60;


    if (nbHours < 10)
    {
      toReturnTime = toReturnTime + "0";
    }
    toReturnTime = toReturnTime + nbHours + " : ";

    if (nbMinutes < 10)
    {
      toReturnTime = toReturnTime + "0";
    }
    toReturnTime = toReturnTime + nbMinutes + " : ";

    // Seconds
    if (nbSeconds < 10)
    {
      toReturnTime = toReturnTime + "0";
    }
    toReturnTime = toReturnTime + nbSeconds;

    return (toReturnTime);
  }

  DeleteSavedTime(index: number): void
  {
    this.savedTimes.splice(index, 1);
  }
}
