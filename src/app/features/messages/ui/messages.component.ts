import { Component, inject } from '@angular/core';
import { MessageService } from '../data/message.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'toh-messages',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  #messageService: MessageService = inject(MessageService);

  messages: Observable<string[]> = this.#messageService.messages$;

  clear(): void {
    this.#messageService.clear();
  }
}
