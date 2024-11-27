import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public placeHolder: string = 'Search by capital...';
  public countries: Country[] = [];

  constructor( private countryService: CountryService ) {}

  searchCapital( term: string ) : void {
    console.log('term::', term );

    this.countryService.searchCapital( term )
      .subscribe( resp => {
        this.countries = resp;
        console.log( resp );
      })
  }
}
