import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle : string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string = '';
    sub!: Subscription ;

    private _listFilter = '';
    
    get listFilter():string {
        return this._listFilter;
    }

    set listFilter(value: string){
        this._listFilter = value;
        // this.filterProducts = this.performFilter();
        this.filterProducts = this.performFilter(value);
    }

    filterProducts: IProduct[] = [];

    products: IProduct[] = [];

    // performFilter(): IProduct[]{
    //     return this.products.filter((product:IProduct) =>
    //     product.productName.toLowerCase().includes(this._listFilter))
    // }

    constructor(private productService: ProductService){}

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filterProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: ' + message; 
    }
}