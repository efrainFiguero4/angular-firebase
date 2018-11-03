import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{
		path: '', component: UsuarioComponent,
		children: [
			{ path: 'nuevo', loadChildren: './detalle/detalle.module#DetalleModule' },
			{ path: 'editar/:id', loadChildren: './detalle/detalle.module#DetalleModule' }
		]
	}
]


@NgModule({
	declarations: [UsuarioComponent],
	imports: [
		CommonModule, RouterModule.forChild(routes)
	]
})

export class UsuarioModule { }
