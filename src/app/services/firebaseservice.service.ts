import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { takeUntil } from 'rxjs/operators';

export class Usuario {
	id: number;
	nombre: string;
	apellidos: string;
}

@Injectable({ providedIn: 'root' })

export class UsuarioService {

	API_USUARIOS = "usuarios/";

	constructor(public _firebase: AngularFireDatabase) { }

	get_usuarios() {
		return this._firebase.list<Usuario>(this.API_USUARIOS).valueChanges();
	}

	get_usuario(id: number) {
		return this._firebase.object<Usuario>(this.API_USUARIOS + id).valueChanges();
	}

	add_usuario(usuario: Usuario) {
		return this._firebase.database.ref(this.API_USUARIOS + usuario.id).set(usuario);
	}

	edit_usuario(usuario: Usuario) {
		return this._firebase.database.ref(this.API_USUARIOS + usuario.id).set(usuario);
	}

	delete_usuario(usuario: Usuario) {
		return this._firebase.database.ref(this.API_USUARIOS + usuario.id).remove();
	}
}
