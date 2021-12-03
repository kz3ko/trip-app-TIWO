import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WycieczkiService } from '../wycieczki.service';
import { Ocena, Wycieczka } from '../model/wycieczki';

@Component({
  selector: 'app-wycieczka-details-screen',
  templateUrl: './wycieczka-details-screen.component.html',
  styleUrls: ['./wycieczka-details-screen.component.scss'],
})
export class WycieczkaDetailsScreenComponent implements OnInit {
  wycieczka: Wycieczka;

  constructor(private route: ActivatedRoute, private service: WycieczkiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.service.getWycieczka(params.id, (wycieczka) => {
          this.wycieczka = wycieczka;
        });
      },
    );
  }

  onRateWycieczka = ($event: Ocena) => {
    const updatedWycieczka = { ...this.wycieczka, oceny: [...this.wycieczka.oceny, $event] };
    this.service.updateWycieczka(updatedWycieczka);
    this.wycieczka = updatedWycieczka;
  }

  get dataRozpoczecia(): string {
    return this.formatDate(this.wycieczka.dataZakonczenia as unknown as string);
  }

  get dataZakonczenia(): string {
    return this.formatDate(this.wycieczka.dataRozpoczecia as unknown as string);
  }

  private formatDate = (date: string) => new Date(date).toLocaleDateString();
}
