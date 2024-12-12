import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const tokenStorageService = inject(TokenStorageService);

  // Check if the request should skip the interceptor
  if (req.headers.has('X-Skip-Interceptor')) {
    const headers = req.headers.delete('X-Skip-Interceptor');

    return next(req.clone({ headers, withCredentials: true }));
  }

  const token = tokenStorageService.getAccessToken();

  if (token) {
    req = req.clone({
      headers: new HttpHeaders().set('Authentication', `${token}`),
      withCredentials: true,
    });
  } else {
    req = req.clone({ withCredentials: true });
  }

  return next(req);
};
