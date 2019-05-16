import { Component } from '@angular/core';

import { Product } from '../../model/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  model = new Product(undefined, 'Hat', 'A cool label hat', 20);

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('PRESSED SUBMIT');
  }

  constructor(private productService: ProductService) { }

}
