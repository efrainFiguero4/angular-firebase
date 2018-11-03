import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService, Usuario } from '../../services/firebaseservice.service';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

	constructor(private _usuarioservice: UsuarioService) { }

	ls_usuarios: Usuario[];

	ngOnInit() {
		this.get_usuarios()
	}

	ngOnDestroy() {

	}

	get_usuarios() {
		this._usuarioservice.get_usuarios().valueChanges().subscribe(resp => {
			this.ls_usuarios = resp;
			console.log(this.ls_usuarios);
		})
	}

	go_eliminarusuario(usuario: Usuario) {
		this._usuarioservice.delete_usuario(usuario).then(resp => {
			console.log("usuario eliminado");
		})
	}
}
