export class PokeAPI {

  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() { }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // either a specific URL depending on the place we left off, or the first page with no id
    // response.next = "https://pokeapi.co/api/v2/location-area/?offset=20&limit=20"
    // the above ^ is how we page through the locations, in addition to response.previous
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
    }
    return (await res.json()) as ShallowLocations;
  }

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