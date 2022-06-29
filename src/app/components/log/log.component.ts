import { LoggerService, ILogData, LogDataTypes } from './../../services/logger/logger.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  public loggedData: ILogData[] = [];
  public loggedDataByType = new Map<LogDataTypes, ILogData[]>();

  get logDataTypes() {
    return LogDataTypes;
  }

  constructor(
    private _logger: LoggerService,
  ) { }

  ngOnInit(): void {
    this._logger.$gameLog.subscribe(datum => {
      if (!this.loggedDataByType.has(datum.type)) {
        this.loggedDataByType.set(datum.type, []);
      }

      this.loggedDataByType.get(datum.type)?.push({...datum});
      this.loggedData.push({...datum});
    });
  }

}
