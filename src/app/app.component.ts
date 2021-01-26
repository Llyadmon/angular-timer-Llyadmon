import { Component } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-timer';

  // Numbers to calcul the timer's value when it starts and stops
  public startDate = 0;
  public currentTimer = 0;
  public stoppedTime = 0;

  // Timer printed
  public toPrintTime = "00 : 00 : 00 : 000";

  // Check if the timer is already running
  public timerRunning = false;

  // Array of saved times
  public savedTimes: Array<number> = [];

  // Timer's interval
  public timer: any;

  // Defines the state of the Start/Stop button
  public startStopText = "Démarrer / Reprendre";
  // Printed message when a button is clicked
  public msgInfo = "Bonjour";

  // Start the timer if it is not running. Stop the timer if it is running
  BtnStartStopTimer(): void
  {
    // If the timer isn't running
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
      }, 1);
      this.startStopText = "Stop";
      this.msgInfo = "Chronomètre démarré/redémarré";
    }
    // If the timer is running
    else
    {
      clearInterval(this.timer);
      this.timerRunning = false;
      this.startStopText = "Démarrer / Reprendre";
      this.stoppedTime = this.currentTimer;
      this.msgInfo = "Chronomètre mis en pause";
    }
  }

  // Save the current time of the timer in savedTimes
  BtnSaveTime(): void
  {
    this.savedTimes.push(this.currentTimer);
    this.msgInfo = "Temps sauvegardé";
  }

  // Reset the timer to 0
  BtnResetTimer(): void
  {
    if (this.timerRunning)
    {
      this.BtnStartStopTimer();
    }
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
    let nbMilliseconds = numberTime % 1000;

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
    toReturnTime = toReturnTime + nbSeconds + " : ";

    // Milliseconds
    if (nbMilliseconds < 10)
    {
      toReturnTime = toReturnTime + "00";
    }
    else if (nbMilliseconds < 100)
    {
      toReturnTime = toReturnTime + "0";
    }
    toReturnTime = toReturnTime + nbMilliseconds;

    return (toReturnTime);
  }

  // Delete a saved time in the table
  DeleteSavedTime(index: number): void
  {
    this.savedTimes.splice(index, 1);
    this.msgInfo = "Temps sauvegardé supprimé";
  }

  // Delete all saved times
  DeleteAllSavedTimes(): void
  {
    this.savedTimes = [];
    this.msgInfo = "Tous les temps sauvegardés supprimés";
  }
}
