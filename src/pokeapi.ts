/*
Add a map command. It displays the names of 20 location areas in the Pokemon world. 
Each subsequent call to map should display the next 20 locations, and so on. 
This will be how we explore the Pokemon world. 
*/

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // implement this
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
  }
}

export type ShallowLocations = {
  // add properties here
};

export type Location = {
  // add properties here
};