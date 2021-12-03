import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export class APIIntereceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({ url: environment.baseApiUrl + req.url, withCredentials: true });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
