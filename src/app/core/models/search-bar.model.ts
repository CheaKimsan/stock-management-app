export interface PlaceResult {
    placeId: string;
    displayName: string;
    description: string;
    lat: number;
    lng: number;
    photoURI?: string;
}

export interface SuggestionPart {
    text: string;
    highlight: boolean;
}

export interface EnrichedSuggestion {
    raw: any;
    mainParts: SuggestionPart[];
    secondary: string;
}
