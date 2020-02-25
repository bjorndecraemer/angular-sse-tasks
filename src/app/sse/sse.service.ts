import {Injectable, NgZone} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  public $tasks = new ReplaySubject();

  constructor(private _zone: NgZone) { }

  getServerSentEvent(url: string): Observable<any>{
    return Observable.create(observer => {
      const eventSource = this.getEventSource(url);

      eventSource.onmessage = event => {
        this._zone.run(() => {
         observer.next(event);
        });
      };

      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        })
      }
    })
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
