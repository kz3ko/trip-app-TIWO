import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../date-range-filter/date-range-filter.component';
import { FilterFunction, FiltersProviderService } from '../filters-provider.service';
import { Wycieczka } from '../model/wycieczki';
import { WycieczkiService } from '../wycieczki.service';
import { NumericRange } from '../price-range/price-range.component';

export const dateToNgbDate = (date: Date) => NgbDate.from({ day: new Date(date).getUTCDate(), month: new Date(date).getUTCMonth() + 1, year: new Date(date).getUTCFullYear() });

export type WycieczkaTestFunction = (wycieczka: Wycieczka) => boolean;

type FilterType = 'dateRange' | 'search' | 'priceRange' | 'reviewThreshold' | 'allowedRegions';

const meanWycieczkaRating = (wycieczka: Wycieczka): number | null => (wycieczka.oceny.length ? wycieczka.oceny.reduce((acc, { gwiazdki }) => acc + gwiazdki, 0) / (wycieczka.oceny.length + 1) : null);

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
  providers: [],
})
export class FilterListComponent implements OnInit {
  private filters: Partial<Record<FilterType, FilterFunction>> = {};

  filtersEnabled: Record<FilterType, boolean> = {
    search: false,
    dateRange: false,
    priceRange: false,
    reviewThreshold: false,
    allowedRegions: false,
  };

  wycieczki: Wycieczka[];

  maxWycieczkaValue = 30000;

  constructor(private wycieczkiService: WycieczkiService, private filtersProviderService: FiltersProviderService) {
    this.wycieczki = this.wycieczkiService.wycieczki;
    this.wycieczkiService.wycieczkiStream$.subscribe((wycieczki) => {
      this.wycieczki = wycieczki;
      this.maxWycieczkaValue = this.wycieczki.reduce((acc: number, wycieczka) => (wycieczka.cena > acc ? wycieczka.cena : acc), 0);
    });
  }

  ngOnInit(): void {

  }

  swapFilter = (filterName: FilterType, filter?: WycieczkaTestFunction) => {
    if (filter) {
      this.filters[filterName] = (wycieczki) => wycieczki.filter(filter);
    }

    this.pushNewFilters();
  }

  flipFilter = (filterName: FilterType) => { // Now we have 1 filter per type
    this.filtersEnabled[filterName] = !this.filtersEnabled[filterName];
    this.pushNewFilters();
  }

  pushNewFilters = () => {
    const enabledFilters = Object.entries(this.filters)
      .filter(([name]) => this.filtersEnabled[name])
      .map(([_, value]) => value);
    this.filtersProviderService.changeFilters(enabledFilters);
  }

  getMaxWycieczkaValue = () => this.maxWycieczkaValue;

  availableRegions = () => this.wycieczki.map(({ docelowyKraj }) => (docelowyKraj));

  onDateRangeChange = (range: DateRange) => {
    if (!range.from || !range.to) {
      return;
    }

    const isInside = (date: NgbDate) => date.after(range.from) && date.before(range.to);
    this.swapFilter('dateRange',
      (wycieczka) => isInside(dateToNgbDate(wycieczka.dataRozpoczecia)) && isInside(dateToNgbDate(wycieczka.dataZakonczenia)));
  }

  onSearchChange = (search: string) => {
    if (search) {
      this.filtersEnabled.search = true;
      this.swapFilter('search', ((wycieczka) => JSON.stringify(wycieczka).toLowerCase().includes(search.toLowerCase())));
    } else {
      this.filtersEnabled.search = false;
    }
  }

  onPriceRangeChange = (priceRange: NumericRange) => {
    this.swapFilter(
      'priceRange',
      ((wycieczka) => wycieczka.cena <= priceRange.max && wycieczka.cena >= priceRange.min),
    );
  }

  onReviewThresholdChange = (threshold: number) => {
    this.swapFilter(
      'reviewThreshold',
      (wycieczka) => {
        const meanResult = meanWycieczkaRating(wycieczka);
        if (meanResult) {
          return meanResult >= threshold;
        }
        return true;
      },
    );
  }

  onRegionsChange = (regions: string[]) => {
    this.swapFilter(
      'allowedRegions',
      ((wycieczka) => !regions.length || regions.includes(wycieczka.docelowyKraj)),
    );
    this.filtersEnabled.allowedRegions = true;
  }
}
