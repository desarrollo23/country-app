import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country | null;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countryService.searchCountryByAlphaCode(id))
      )
      .subscribe( country => {
        if(!country) {
          this.router.navigateByUrl('');
        }

        this.country = country;
      })
  }

}
