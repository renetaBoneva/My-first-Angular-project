import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from 'src/app/shared/components/error-page/error-page.component';
import { ProductsCatalogComponent } from './pages/products-catalog/products-catalog.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
    {
        path: "catalog",
        children: [
            { path: '', pathMatch: 'full', component: ProductsCatalogComponent },
            { path: ':id', component: ProductDetailsComponent },
        ]
    },
    { path: "**", component: ErrorPageComponent },
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
