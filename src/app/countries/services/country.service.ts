import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, of, map, delay, tap } from "rxjs";
import { Country } from "../interfaces/country";
import { CacheStoreCountries } from "../interfaces/cache-store.interface";
import { Region } from "../interfaces/region.type";

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStoreCountries = {
        byCapital: { term: '', countries: [] },
        byCountry: { term: '', countries: [] },
        byRegion: { region: '', countries: [] }
    };

    constructor( private httpClient: HttpClient ) {
        this.loadFromLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage() {

        if(!localStorage.getItem('cacheStore')) return;

        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }

    searchCapital(term: string) : Observable<Country[]> {
        return this.searchBy(term, 'capital')
            .pipe(
                tap( countries => this.cacheStore.byCapital = { term, countries }),
                tap( () => this.saveToLocalStorage())
            );
    }

    searchCountry(term: string) : Observable<Country[]> {
        return this.searchBy(term, 'name')
            .pipe(
                tap( countries => this.cacheStore.byCountry = { term, countries }),
                tap( () => this.saveToLocalStorage())
            );
    }

    searchRegion(region: Region) : Observable<Country[]> {
        return this.searchBy(region, 'region')
            .pipe(
                tap( countries => this.cacheStore.byRegion = { region , countries }),
                tap( () => this.saveToLocalStorage())
            );
    }

    private searchBy( term: string, endpoint: string ): Observable<Country[]> {
        return this.httpClient.get<Country[]>(`${this.apiUrl}/${endpoint}/${term}`)
            .pipe(
                catchError( () => of([]))
            );
    }

    searchCountryByAlphaCode( code: string ): Observable<Country | null> {
        return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
            .pipe(
                map( countries => countries.length > 0 ? countries[0]: null),
                catchError( () => of(null))
            );
    }

}