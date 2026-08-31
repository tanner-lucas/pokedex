import { Cache } from "./pokecache.js";

export class PokeAPI {

  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  };

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    const url = pageURL || `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;


    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      console.log("***cache hit***");
      return cached;
    };

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
    }

    const locations = (await res.json()) as ShallowLocations;
    this.cache.add(url, locations);
    return locations;
  }
  
  closeCache() {
    this.cache.stopReapLoop();
  };

  /*async fetchLocation(locationName: string): Promise<Location> {
    
  }*/
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  // add properties here
};