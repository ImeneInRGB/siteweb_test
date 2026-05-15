import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('doit ajouter une note à la liste', () => {
    const component = new AppComponent();
    component.titre = 'Test Note';
    component.contenu = 'Contenu de test';
    
    component.ajouterNote(); // Ta fonction
    
    expect(component.notes.length).toBe(1);
    expect(component.notes[0].titre).toBe('Test Note');
  });
});