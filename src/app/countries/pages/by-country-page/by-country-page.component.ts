import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public placeHolder: string = 'Search by country...';
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countryService: CountryService ) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountry.countries;
    this.initialValue = this.countryService.cacheStore.byCountry.term;
  }

  searchCountry(term: string): void {
    this.isLoading = true;

    this.countryService.searchCountry( term )
      .subscribe( resp => {
        this.countries = resp;
        this.isLoading = false;
      })
  }
}
