# Green planet - My-first-Angular-project

| Contents
|---
| [Description](#description)
| [Project design](#project-design)
| [Overview](#overview)
| - [Landing page](#landing-page)
| - [Login page](#login-page)
| - [Register page](#register-page)
| - [My profile page](#my-profile-page)
| - [Products page](#products-page)
| - [Product details page](#product-details-page)
| - [Cart page](#cart-page)
| - [Continue order page](#continue-order-page)
| - [Confirmed order page](#onfirmed-order-page)
| - [Error page](#error-page)
| [Getting Started](#getting-started)
| [Backend](#backend)

## Description
This is my final project that I created while studying in the SoftUni Angular course - July 2023 edition. It helped me to better understand the framework. After a short research and with the help of my lecture, I learned that the best architectural practices involve using core, features, and shared modules. It was a pleasure for me to solve all the problems I faced during this journey.
## Project design
I sketched my application using Figma, and then implemented it using HTML and CSS. The design is responsive, and the website works correctly on every device.
## Overview
It's **e-commerce** website for plants where authorized and unauthorized users can make orders. I used localStorage to update the user's cart info, because the data will be stored even if the user closes the browser. There are **canActivate guards** on `/login` and `/register`, `/my-profile` page. I used an **interceptor** to handle the addition of an access token to the request header when a user is logged in. It also handles loading functionality.
- Navigation for logged users

![navigation logged user img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/navigation-logged-in-user.png)
- Navigation for unlogged users

![navigation unlogged user img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/navigation-unlogged-users.png)
### Landing page
There is a link to products catalog and collection of best sellers on landing page.

![landing page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_home.png)
### Login page
This is a template-driven login form that utilizes ngModel validators for inputs. Upon user login, it updates your cart with the products you had in it before logging out.

![login page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_login.png)
### Register page
This is a template-driven registration form utilizing ngModel validators for inputs. All fields are required. The first name and last name must be at least 2 characters long, the address must contain at least 4 characters. The password's minimum length is 5 characters, and the password mismatch validation is implemented using a custom directive on the repeated password field.

![register page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_register.png)
### My profile page
This page can only be accessed by users who are logged in. It represents the user's personal account data and their orders. There are options to edit and delete the account. The edit form is implemented using a reactive form.When clicking the delete button, a browser alert confirmation appears in case you clicked by mistake.

**NOTE:** The practice server does not support user delete, so you will still be able to log in even after a successful deletion

![my profile page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_my-profile.png)

![my profile page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_profile-edit.png)
### Products page
Each product page displays a maximum of 6 products. You can filter the catalog by price and category. 

![products page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_catalog.png)
### Product details page
You can access this page by clicking on the product card, and here you can find complete information about the plant.

![product details page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_product-details.png)
### Cart page
On the cart page, you can increase or decrease current products' count. If you have all the plants you want in your basket, you can continue with the order by clicking the button. 

![cart page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_cart.png)
![empty cart page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_empty-cart.png)
### Continue order page
If the user is logged, the order details form will be authomaticaly filled, otherwise they will be empty. 

![continue order page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_continue-order.png)
### Confirmed order page
User should be redirected to `/order-confirmed` after successful order.

![Confirmed order page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_order-confirmed.png)
### Error page
I've used ngx-toastr library to manage error and success notification, but  in the case of attempting to access a non-existing page, the system should automatically redirect to `/error`.

![error page img](https://github.com/renetaBoneva/My-first-Angular-project/blob/main/readme-images/localhost_4200_error.png)
## Getting Started

* Clone the repo from github.
* Open integrated terminal on green-planet-angular-application directory and run `npm install`.
* Change directory `cd ../server`
* Run `node server.js`.
* Make sure you have the [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally.
* Change directory `cd ../green-planet-angular-application`
* Run `ng serve` for a dev server. 
* Navigate to `http://localhost:4200/` and reload the page.

## Backend
The backend is built using Node.js, Express.js and JWT for authentication.

[I've used SoftUni Practice Server](https://github.com/softuni-practice-server/softuni-practice-server/tree/master)
