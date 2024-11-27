import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../interfaces/country";

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor( private httpClient: HttpClient ) {}

    searchCapital(term: string) : Observable<Country[]> {

        return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`);
    }
}