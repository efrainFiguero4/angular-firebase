import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../../services/firebaseservice.service';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { slideInOutAnimation } from './detalle.animation';
import { isNullOrUndefined } from 'util';
import { Subject } from 'rxjs';
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
	destroy: Subject<boolean> = new Subject<boolean>();

	ngOnInit() {
		this.id_usuario = this._route.snapshot.params["id"];
		if (!isNullOrUndefined(this.id_usuario))
			this.get_usuario(this.id_usuario)
		else
			this.usuario = new Usuario();
	}

	ngOnDestroy(): void {
		this.destroy.next();
		this.destroy.complete();
	}

	get_usuario(id: number) {
		this._usuarioservice.get_usuario(id).pipe(takeUntil(this.destroy)).subscribe(usuario => {
			this.usuario = usuario;
		}, error => console.error(error), () => console.log("complete"))
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
