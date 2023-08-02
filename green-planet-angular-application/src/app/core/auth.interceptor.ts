import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { environment } from "src/environments/environment.development";

const { apiUrl } = environment;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.getToken();
        if (req.url.startsWith('/users')) {
            req = req.clone({
                url: `${apiUrl}${req.url}`,
                // headers: req.headers.set('X-Authorization', jwtSync.verify())
                // withCredentials: true,                
            })
        }
        return next.handle(req).pipe(
            catchError((err) => {
                console.log(err.message);
                return [err];
            })
        )
    }

    getToken(): string | false {
        return false;
    }
}

export const authInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
}