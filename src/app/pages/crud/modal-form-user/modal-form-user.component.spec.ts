import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalFormUserComponent } from './modal-form-user.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('ModalFormUserComponent', () => {
  let component: ModalFormUserComponent;
  let fixture: ComponentFixture<ModalFormUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormUserComponent],
      imports: [
         
      ], providers:[
         { provide: MatDialogRef, useValue: {} },
          
        { provide: FIREBASE_OPTIONS, useValue: {} }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
