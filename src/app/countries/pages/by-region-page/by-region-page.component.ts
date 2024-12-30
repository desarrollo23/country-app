import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: 'by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public placeHolder: string = 'Search by region...';
  public countries: Country[] = [];
  public regions: Region[] = ['Africa' , 'America' , 'Europe' , 'Asia' , 'Oceania'];
  public selectedRegion?: Region;

  constructor( private countryService: CountryService ) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }

  searchRegion( region: Region ) : void {
    this.selectedRegion = region;
    this.countryService.searchRegion( region )
      .subscribe( resp => {
        this.countries = resp;
        console.log( resp );
      })
  }

}
