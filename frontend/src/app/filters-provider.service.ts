import { Injectable } from '@angular/core';
import { Wycieczka } from './model/wycieczki';
import { Subject } from 'rxjs';
import {v4 as uuid } from 'uuid';

export type FilterFunction = (wycieczki: Wycieczka[]) => Wycieczka[];

@Injectable({
  providedIn: 'root'
})
export class FiltersProviderService {

  private filterSource = new Subject<FilterFunction[]>(); // Filter subject
  filterStream$ = this.filterSource.asObservable(); // Filter stream
  id: string;

  constructor() {
    this.id = uuid();
  }


  changeFilters = (filters: FilterFunction[]) => {
    this.filterSource.next(filters);
  }

}
