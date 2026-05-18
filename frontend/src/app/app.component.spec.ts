import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule], // Ajout de FormsModule pour le ngModel
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should allow setting new title and content and triggering save', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    // Utilisation des VRAIS noms de variables de ton composant
    component.newTitle = 'Test Note';
    component.newContent = 'Contenu de test';

    // Espionner la méthode fetch pour éviter de lancer une vraie requête HTTP pendant le test
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(JSON.stringify([]))));

    // Appel de la VRAIE fonction de ton composant
    component.saveNote();

    expect(window.fetch).toHaveBeenCalled();
  });
});