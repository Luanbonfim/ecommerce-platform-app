import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';

import { Product } from '../../../../models/product.model';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductModalComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string | null = null;
  showModal: boolean = false;
  selectedProduct?: Product;
  isAdmin: boolean = false;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.checkAdminRole();
  }

  private checkAdminRole(): void {
    this.isAdmin = this.authService.getCurrentUserRoles().includes('Admin');
  }

  private loadProducts(): void {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  openAddProductModal(): void {
    this.selectedProduct = undefined;
    this.showModal = true;
  }

  openEditProductModal(product: Product): void {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = undefined;
  }

  onProductAdded(): void {
    this.closeModal();
    this.loadProducts(); // Reload products after adding/updating
  }

  deleteProduct(product: Product, event: Event): void {
    event.stopPropagation(); // Prevent opening edit modal when clicking delete
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.productsService.deleteProduct(product.id).subscribe({
        next: () => {
          this.loadProducts(); // Reload products after deletion
        },
        error: (error) => {
          this.error = 'Failed to delete product. Please try again.';
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}
