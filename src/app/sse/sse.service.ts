import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor() { }

  newObservable<R>(path: string): Observable<R> {
    return new Observable(observer => {
      const eventSource = new EventSource(path);
      eventSource.onmessage = event => {
        observer.next(event.data);
      };
      eventSource.onerror = () => {
        if (eventSource.readyState !== eventSource.CONNECTING) {
          observer.error('An error occurred.');
          console.log("HERE2");
        }
        eventSource.close();
        observer.complete();
      };
      return () => {
        eventSource.close();
      };
    });
  }

}
