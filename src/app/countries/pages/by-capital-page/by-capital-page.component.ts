import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public placeHolder: string = 'Search by capital...';
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countryService: CountryService ) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  searchCapital( term: string ) : void {
    this.isLoading = true;

    this.countryService.searchCapital( term )
      .subscribe( resp => {
        this.countries = resp;
        console.log( resp );
        this.isLoading = false;
      })
  }
}
