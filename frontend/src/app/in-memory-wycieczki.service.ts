import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryWycieczkiService extends InMemoryDbService {

  constructor() {
    super();
  }

  createDb(): {} | Observable<{}> | Promise<{}> {
    // return { wycieczki };
    return {};
  }
}
