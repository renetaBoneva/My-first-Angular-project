import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { UserLocalStorage } from "../features/user/types/UserLocalStorage";

const { apiUrl } = environment;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.getToken();
        
        // add token in headers
        if (req.url.startsWith('/users') && accessToken) {
            req = req.clone({
                headers: req.headers.set('X-Authorization', accessToken)
            })
        }

        // put together full url
        req = req.clone({
            url: `${apiUrl}${req.url}`
        })

        return next.handle(req).pipe(
            catchError((err) => {
                console.log(err.message);
                return [err];
            })
        )
    }

    getToken(): string | false {
        const lsData = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE)

        if (lsData) {
            const lsUserData: UserLocalStorage = JSON.parse(lsData);
            return lsUserData.accessToken;
        }

        return false;
    }
}

export const authInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
}