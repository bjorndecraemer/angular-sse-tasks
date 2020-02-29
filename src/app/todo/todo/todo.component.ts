import {Component, OnInit} from '@angular/core';
import {SseService} from "../../sse/sse.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  private eventTypes = ['message','open','join','leave'];

  constructor(private sseService : SseService){}

  ngOnInit() {
    console.log("watcherEvent");
    // OLD CODESTYLE
    // if (typeof(EventSource) !== 'undefined') {
    //   const eventSource = new EventSource('http://localhost:8080/sse');
    //   this.eventTypes.forEach((type: string) =>
    //     eventSource.addEventListener(type, (message: any) => console.log(message))
    //   );
    //   //eventSource.onmessage = (message) => alert(message);
    //   eventSource.onerror = (error) => console.log(error);
    //   return () => {
    //     eventSource.close();
    //   };
    // }
    this.sseService
      .newHeaterConnection("http://localhost:8080/sse")
      .subscribe((watcherEvent) => console.log(watcherEvent), error => console.log(error), () => console.log("COMPLETE"));
  }

}
