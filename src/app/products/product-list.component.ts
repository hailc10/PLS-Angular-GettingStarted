import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle : string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;

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
        this.products = this.productService.getProducts();
        this.filterProducts = this.products;
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: ' + message; 
    }
}