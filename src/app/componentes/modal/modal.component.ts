import { Component, inject,model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Direccion } from '../../modelos/direcciones';
import { DOCUMENT } from '@angular/common';
import { ClipboardModule} from '@angular/cdk/clipboard';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    ClipboardModule,
    FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  _copia = inject(Clipboard);
  _dialogRef = inject(MatDialogRef<ModalComponent>);
  _document = inject(DOCUMENT);
  data = inject<Direccion>(MAT_DIALOG_DATA);
  accion:boolean = this.data.accion === 1 ? true : false;
  origen:String = "";
  destino:String = "";
  url:any = this._document.location.href.replace('/principal','')
  .concat(`/seguimiento?id=${Math.floor(Math.random() * 1000)}`);
  

  aceptar(): void {
    this._dialogRef.close({origen:this.origen,destino:this.destino});
  }

  cancelar(): void {
    this._dialogRef.close();
  }
  copiar(){
    this._copia.copy(this.url);
    alert("La url se ha copiado");
    this._dialogRef.close();
  }
}
