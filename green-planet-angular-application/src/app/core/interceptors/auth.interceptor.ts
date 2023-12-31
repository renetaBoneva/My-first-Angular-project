import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { UserLocalStorage } from "../../features/user/types/UserLocalStorage";
import { LoadingService } from "src/app/shared/services/loading.service";
import { NotificationService } from "src/app/shared/services/notification.service";

const { apiUrl } = environment;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private loadingService: LoadingService,
        private notificationService: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.startLoading()
        const accessToken = this.getToken();

        if (!req.url.startsWith('/init')) {

            // add admin token in headers
            if (req.url.startsWith('/admin') && accessToken) {
                req = req.clone({
                    url: req.url.replace('/admin', ''),
                    headers: req.headers.set('X-Admin', accessToken)
                })
            }
            // add token in headers
            else if ((req.url.startsWith('/users') && accessToken) || accessToken) {
                req = req.clone({
                    headers: req.headers.set('X-Authorization', accessToken)
                })
            }

            // put together full url
            req = req.clone({
                url: `${apiUrl}${req.url}`
            })

            return next.handle(req).pipe(
                tap(() => {
                    this.loadingService.stopLoading()
                }),
                catchError((err) => {
                    console.log(err.message);
                    this.notificationService.showError(err.message)
                    this.loadingService.stopLoading()
                    return [err];
                })
            )
        } else {
            // add token in headers
            if ((req.url.startsWith('/users') && accessToken) || accessToken) {
                req = req.clone({
                    headers: req.headers.set('X-Authorization', accessToken)
                })
            }

            // put together full url
            req = req.clone({
                url: `${apiUrl}${req.url.replace('/init', '')}`
            })
            return next.handle(req).pipe(
                tap(() => {
                    this.loadingService.stopLoading()
                }));
        }
    }

    getToken(): string | false {
        const lsData = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE)

        if (lsData) {
            const lsUserData: UserLocalStorage = JSON.parse(lsData);
            return lsUserData.accessToken;
        }

        const initData = localStorage.getItem(environment.INIT_ACCESS_TOKEN_LOCAL_STORAGE)

        if (initData) {
            const lsUserData: UserLocalStorage = JSON.parse(initData);
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