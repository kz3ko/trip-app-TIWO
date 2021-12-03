import { Component, OnInit } from '@angular/core';
import { WycieczkiService } from '../wycieczki.service';
import { FlashDeal, Wycieczka } from '../model/wycieczki';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  allWycieczki: Wycieczka[];

  constructor(private wycieczkiService: WycieczkiService) {
    this.allWycieczki = this.wycieczkiService.wycieczki;
    wycieczkiService.wycieczkiStream$.subscribe((wycieczki) => {
      this.allWycieczki = wycieczki;
    });
  }

  ngOnInit(): void {
  }

  handleRemoveWycieczka($event: Wycieczka): void {
    this.wycieczkiService.deleteWycieczka($event);
  }

  handleEditWycieczka($event: Wycieczka): void {
    this.wycieczkiService.updateWycieczka($event);
  }

  handleNewFlashDeal($event: Omit<FlashDeal, '_id'>): void {
    this.wycieczkiService.pushFlashDeal($event);
  }
}
