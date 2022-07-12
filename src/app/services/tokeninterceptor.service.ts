import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthserviceService) {}
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    
    let newReq=request;
    let token=sessionStorage.getItem("token")
    console.log("Interceptor Token",token)
    if (token!=null) {
        console.log(token)
      newReq = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return next.handle(newReq);
  }
}