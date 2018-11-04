import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService, Usuario } from '../../services/firebaseservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

	constructor(private _usuarioservice: UsuarioService) { }

	ls_usuarios: Usuario[];
	destroy: Subject<boolean> = new Subject<boolean>();

	ngOnInit() {
		this.get_usuarios()
	}

	ngOnDestroy() {
		this.destroy.next();
		this.destroy.complete();
	}

	get_usuarios() {
		this._usuarioservice.get_usuarios().pipe(takeUntil(this.destroy)).subscribe(resp => {
			this.ls_usuarios = resp;
		}, error => console.error(error), () => console.log("complete"));
	}

	go_eliminarusuario(usuario: Usuario) {
		this._usuarioservice.delete_usuario(usuario).then(resp => {
			console.log("usuario eliminado");
		})
	}
}
