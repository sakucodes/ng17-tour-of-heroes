import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly #maxMessages = 5;

  #messages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  get messages$(): Observable<string[]> {
    return this.#messages.asObservable();
  }

  add(message: string) {
    this.#messages.next([...this.#messages.getValue().slice(this.#maxMessages * -1), message]);
  }

  clear() {
    this.#messages.next([]);
  }

}
