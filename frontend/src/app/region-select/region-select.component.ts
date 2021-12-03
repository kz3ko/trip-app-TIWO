import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.scss'],
})
export class RegionSelectComponent {
  regions: string[];

  @Input() set availableRegions(availableRegions: string[]) {
    this.regions = availableRegions.reduce((acc, region) => (acc.includes(region) ? acc : [...acc, region]), []);

    this.regions.forEach((region) => {
      if (this.checkboxesValues[region] === undefined) {
        this.checkboxesValues[region] = false;
      }
    });
  }

  @Output() selectRegions = new EventEmitter<string[]>();

  checkboxesValues: Record<string, boolean> = {};

  checkboxChange = () => {
    this.selectRegions.emit(
      Object.entries(this.checkboxesValues)
        .filter(([_, selected]) => selected)
        .map(([region, _]) => region),
    );
  }
}
