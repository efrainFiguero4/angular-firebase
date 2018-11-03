import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../../services/firebaseservice.service';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { slideInOutAnimation } from './detalle.animation';
import { isNullOrUndefined } from 'util';
@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styleUrls: ['./detalle.component.css'],
	animations: [slideInOutAnimation],
	host: { '[@slideInOutAnimation]': '' }
})
export class DetalleComponent implements OnInit {

	constructor(private _route: ActivatedRoute, private _router: Router, private _usuarioservice: UsuarioService) { }

	id_usuario: number;
	usuario = new Usuario();
	ngOnInit() {
		this.id_usuario = this._route.snapshot.params["id"];

		console.log(this.id_usuario, this._route)
		if (!isNullOrUndefined(this.id_usuario))
			this.get_usuario(this.id_usuario)
		else
			this.usuario = new Usuario();
	}

	get_usuario(id: number) {
		console.log(id)
		this._usuarioservice.get_usuario(id).valueChanges().subscribe(usuario => {
			this.usuario = usuario;
			console.log(this.usuario)
		})
	}

	guardar_usuario(usuario: Usuario) {
		if (!isNullOrUndefined(this.id_usuario)) {
			usuario.id = this.id_usuario;
			this._usuarioservice.edit_usuario(usuario).then(resp => {
				this.go_back();
			})
		}
		else {
			usuario.id = Date.now();
			this._usuarioservice.add_usuario(usuario).then(resp => {
				this.go_back();
			})
		}
	}

	go_back() {
		this._router.navigate(['inicio']);
	}
}
