import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW90aHA2ZWZiNWw0a3JtZjFqb2pkeGM4MnZnM2F0MzBvZ2VlaGUwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LKvHJSPgCj4BjF1F5e/giphy.gif" class="bg-gif gif-tl">
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmI4cnlpZjZibzM0bnFrYXUzbmpwejVuODVyMmV4OWVjcmtnYWg1aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cFdHXXm5GhJsc/giphy.gif" class="bg-gif gif-tr">

    <div class="container">
        <h1>Mes Notes Kodemade</h1>
        <input type="text" [(ngModel)]="newTitle" placeholder="Titre de la note...">
        <textarea [(ngModel)]="newContent" rows="4" placeholder="Quoi de neuf ?"></textarea>
        <button (click)="saveNote()">Ajouter la note (enfin)</button>

        <div id="notesDisplay">
            @for (note of notes; track $index) {
                <div class="note">
                    <h3>{{ note.title }}</h3>
                    <p>{{ note.content }}</p>
                </div>
            }
        </div>
    </div>
  `,
  styles: [`
    body { font-family: "Comic Sans MS", cursive; background-color: #f4f4f4; }
    .container { background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 600px; margin: auto; }
    .bg-gif { position: fixed; z-index: -1; opacity: 0.5; height: 100px; }
    .gif-tl { top: 5%; left: 5%; } .gif-tr { top: 5%; right: 5%; }
    input, textarea { width: 100%; margin: 10px 0; padding: 10px; border: 2px solid #ddd; border-radius: 8px; }
    button { background-color: #28a745; color: white; padding: 12px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
    button:hover { background-color: #882173; }
    .note { border-left: 5px solid #28a745; padding: 15px; margin-top: 20px; text-align: left; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .note h3 { color: #882173; margin: 0; }
  `]
})
export class AppComponent implements OnInit {
  notes: any[] = [];
  newTitle = '';
  newContent = '';

  ngOnInit() { this.fetchNotes(); }

  fetchNotes() {
    fetch('http://localhost:8081/api/notes')
      .then(res => res.json())
      .then(data => this.notes = data);
  }

  saveNote() {
    if (!this.newTitle || !this.newContent) return alert("Remplis tout !");
    const note = { title: this.newTitle, content: this.newContent };
    fetch('http://localhost:8081/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    }).then(() => {
      this.newTitle = ''; this.newContent = ''; this.fetchNotes();
    });
  }
}