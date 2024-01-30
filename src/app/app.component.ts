import { Component, DefaultIterableDiffer, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { Product, ProductColumns } from './model/product'
import { ProductService } from './services/product.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = ProductColumns.map((col) => col.key)
  columnsSchema: any = ProductColumns
  dataSource = new MatTableDataSource<Product>()
  valid: any = {}

  constructor(public dialog: MatDialog, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  editRow(row: Product) {
    if (row.productId === '') {
      this.productService.addProduct(row).subscribe((newProduct: Product) => {
        row.productId = newProduct.productId
        row.isEdit = false
      })
    } else {
      this.productService.updateProduct(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: Product = {
      productId: '',
      name: '',
      code: '',
      price:  '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(productId: string) {
    console.log(productId);
    this.productService.deleteProduct(productId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Product) => u.productId !== productId,
      )
    })
  }

  removeSelectedRows() {
    const products = this.dataSource.data.filter((u: Product) => u.isSelected)
    .map(
      product => product.productId
    )
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.productService.deleteProducts(products).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: Product) => !u.isSelected,
            )
          })
        }
      })
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}
