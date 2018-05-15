import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class SocketService {
  constructor() {}

  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Connected " + url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    const ws = new WebSocket(url);
    console.log(ws);
    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
    });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log(ws.send(JSON.stringify(data)));
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
