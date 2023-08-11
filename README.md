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
It's **e-commerce** website for plants where authorized and unauthorized users can make orders. ...
There are **canActivate guards** on `/login` and `/register`, `/my-profile` page. I used an **interceptor** to handle the addition of an access token to the request header when a user is logged in. It also handles loading functionality.
- Navigation for logged users
- Navigation for unlogged users
### Landing page
There is a link to products catalog and collection of best sellers on landing page.
![landing page img]('')
### Login page
### Register page
### My profile page
### Products page
### Cart page
### Continue order page
### Confirmed order page
User should be redirected to `/order-confirmed` after successful order.
![Confirmed order pageimg]('')
### Error page
I've used ngx-toastr library to manage error and success notification, but  in the case of attempting to access a non-existing page, the system should automatically redirect to `/error`.
![error page img]('')
## Getting Started
## Backend
The backend is built using Node.js, Express.js and JWT for authentication.

[I've used SoftUni Practice Server]('https://github.com/softuni-practice-server/softuni-practice-server/tree/master')
