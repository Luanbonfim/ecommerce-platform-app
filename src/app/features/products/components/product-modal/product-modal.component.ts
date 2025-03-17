import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  @Input() product?: Product;
  @Output() closeModal = new EventEmitter<void>();
  @Output() productAdded = new EventEmitter<void>();
  

  productForm: FormGroup;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.error = null;

      const productData = {
        ...this.productForm.value,
        id: this.product?.id // Include ID if editing
      };

      const operation = this.product 
        ? this.productsService.updateProduct(this.product.id, productData)
        : this.productsService.addProduct(productData);

      operation.subscribe({
        next: () => {
          this.productAdded.emit();
          this.closeModal.emit();
        },
        error: (error: Error) => {
          this.error = `Failed to ${this.product ? 'update' : 'create'} product. Please try again.`;
          console.error('Error:', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit();
  }

  get modalTitle(): string {
    return this.product ? 'Edit Product' : 'Add New Product';
  }

  get submitButtonText(): string {
    return this.loading 
      ? (this.product ? 'Updating...' : 'Adding...') 
      : (this.product ? 'Update Product' : 'Add Product');
  }
}
