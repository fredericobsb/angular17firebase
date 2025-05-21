import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  formUser!: FormGroup;
  editUser: Boolean = false;

  listaPlanosSaude = [
    {
      id: 1,
      descricao: 'Plano 300 enfermaria'
    },
    {
      id: 2,
      descricao: 'Plano 400 enfermaria'
    },
    {
      id:3,
      descricao: 'Plano 500 plus'
    }
  ]

   listaPlanosOdontologicos = [
    {
      id: 1,
      descricao: 'Plano Basico'
    },
    {
      id: 2,
      descricao: 'Plano Intermediario'
    },
    {
      id:3,
      descricao: 'Plano plus'
    }
  ]

  constructor(public dialogRef: MatDialogRef<ModalFormUserComponent>,
              private formBuilder: FormBuilder,
              private userService: UsersService,
              @Inject(MAT_DIALOG_DATA) public data:any){}
  
  ngOnInit(){
    this.buildForm();
    console.log('------ o formulario e valido ==> ', this.formUser.valid);
  }


  buildForm(){
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      healthPlan: [''],
      dentalPlan: [''],
    });

    if(this.data && this.data.name){
      this.editUser = true;
      this.fillForm();
    }
  }

  closeModal(){
    this.dialogRef.close();
  }

  fillForm(){
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan
    });
  }

  saveUser(){
    const objUserForm:User = this.formUser.getRawValue();

    if(this.data && this.data.name){
      //EDITAR USUARIO
      this.editUser = true;
      console.log('-------valor de editUser ==> ', this.editUser);
      this.userService.updateUser(this.data.firebaseId, objUserForm).then(
        (response: any) => {
          window.alert('Usuario alterado com sucesso.');
          this.closeModal();
        })
        .catch(err =>{
           window.alert('Um erro ocorreu...');
           console.log(err);
        });
    
    
    } else {
      //SALVAR USUARIO
      this.userService.addUser(objUserForm).then(
        (response:any) => {
          window.alert('Usuario salvo com sucesso.');
          this.closeModal();
        })
        .catch(
          err => {
              window.alert('Um erro ocorreu...');
            console.error(err);
          });
    }
  }
}
