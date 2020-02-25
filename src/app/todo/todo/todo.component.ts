import {Component, OnInit} from '@angular/core';
import {SseService} from "../../sse/sse.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private sseService : SseService){}

  ngOnInit() {
    this.sseService
      .getServerSentEvent("http://localhost:8080/sse")
      .subscribe(data => console.log(data));
  }

}
