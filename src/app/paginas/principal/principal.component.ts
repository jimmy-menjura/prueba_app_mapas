import { Component, inject, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapaComponent } from '../mapa/mapa.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ModalComponent } from '../../componentes/modal/modal.component';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MapaComponent, 
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  origen = signal('');
  destino = signal('');
  dialog = inject(MatDialog);
  _dataService = inject(DataService);
  abrirModal1(){
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {origen: this.origen(), destino: this.destino(),accion:1},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._dataService.enviandoDatosDireccion(result);
        this._dataService.enviarDirecciones(result).subscribe({
         next: (data)=> {alert("guarda direcciones exitoso");},
         error:error=>console.log(error)
        })
      }
    });
  }
  abrirModal2(){
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {accion:2},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      console.log("resultado", result)
      }
      })
  }
}
