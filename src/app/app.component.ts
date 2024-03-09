import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessagesComponent } from './features/messages/ui/messages.component';

@Component({
  selector: 'toh-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tour of Heroes';
}
