import { LocationCity } from "@material-ui/icons";

const levenshtein = require('js-levenshtein');

interface Location {
    city: string;
    country: string;
}

interface WeighedLocation {
    city: string;
    country: string;
    rating: any;
}

export const bestLocationMatches = (count: number, stringToMatch: string, locations: Array<Location>) => {
    let sortedMatches: Array<Location> = locations.map((locationItem: Location) => {
        return {
            city: locationItem.city,
            country: locationItem.country,
            rating: levenshtein(stringToMatch, (`${locationItem.city}, ${locationItem.country}`))
        }
    }).sort((a, b) => a.rating - b.rating).map((weighedLocation: WeighedLocation) => {
        return {
            city: weighedLocation.city, 
            country: weighedLocation.country
        };
    });
    return sortedMatches.length > 10 ? sortedMatches.slice(0, 10) : sortedMatches;
}