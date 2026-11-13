import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Producto } from './producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  // Campos del formulario (enlazados con [(ngModel)])
  nombre: string = '';
  precio: number | null = null;
  cantidad: number | null = null;

  // Lista de productos registrados
  productos: Producto[] = [];

  // Mensaje de error de validación
  mensajeError: string = '';

  // Agrega un producto nuevo al inventario
  agregarProducto(): void {
    const nombreLimpio = this.nombre.trim();

    if (!nombreLimpio || this.precio === null || this.cantidad === null) {
      this.mensajeError = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.precio <= 0) {
      this.mensajeError = 'El precio debe ser mayor a 0.';
      return;
    }

    if (this.cantidad < 1 || !Number.isInteger(this.cantidad)) {
      this.mensajeError = 'La cantidad debe ser un número entero mayor o igual a 1.';
      return;
    }

    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre: nombreLimpio,
      precio: this.precio,
      cantidad: this.cantidad,
    };

    this.productos = [...this.productos, nuevoProducto];
    this.limpiarFormulario();
  }

  // Elimina un producto por su id
  eliminarProducto(id: number): void {
    this.productos = this.productos.filter((producto) => producto.id !== id);
  }

  // Total de productos registrados (cantidad de filas)
  get totalProductos(): number {
    return this.productos.length;
  }

  // Total de unidades en stock
  get totalUnidades(): number {
    return this.productos.reduce((suma, producto) => suma + producto.cantidad, 0);
  }

  // Valor monetario total del inventario
  get valorInventario(): number {
    return this.productos.reduce(
      (suma, producto) => suma + producto.precio * producto.cantidad,
      0
    );
  }

  private limpiarFormulario(): void {
    this.nombre = '';
    this.precio = null;
    this.cantidad = null;
    this.mensajeError = '';
  }
}