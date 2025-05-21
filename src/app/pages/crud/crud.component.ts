import { Component, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interfaces/user';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewUserComponent } from './modal-view-user/modal-view-user.component';
import { ModalFormUserComponent } from './modal-form-user/modal-form-user.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {



  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'benefits', 'action'];
  dataSource: any;
  listUsers: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private userService: UsersService,
              public dialog: MatDialog
  ){
    this.dataSource = new MatTableDataSource<any>(this.listUsers);
  }

  ngOnInit(){
    this.getListUsers();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  getListUsers(){
     this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log('lista de usuarios vindos do firebase', response);
        this.listUsers = response;
        this.dataSource = new MatTableDataSource<any>(this.listUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //para deixar o label da paginacao em Portugues
        this.paginator._intl.itemsPerPageLabel = "Itens por página";
      },
      error: (err) =>{
        console.log('--- deu pau ==>', err);
      }
     });
  }

  openModalViewUser(user: User){
    this.dialog.open(ModalViewUserComponent, {
      width: '700px',
      height: '330px',
      data: user
    })
  }

  openModalEditUser(user:User){
    this.dialog.open(ModalFormUserComponent, {
      width: '700px',
      height: '330px',
      data: user
    }).afterClosed().subscribe(() => this.getListUsers());
  }

  openModalAddUser(){
     this.dialog.open(ModalFormUserComponent, {
      width: '700px',
      height: '330px'
    }).afterClosed().subscribe(() => this.getListUsers());
  }

  deleteUser(firebaseId:string){
    this.userService.deleteUser(firebaseId).then(
      (response: any) =>{
        window.alert('Usuário deletado com sucesso.');
      })
      .catch(err =>{
        window.alert('Um erro ocorreu ao tentar deletar...');
        console.log(err);
      });
  }
}
