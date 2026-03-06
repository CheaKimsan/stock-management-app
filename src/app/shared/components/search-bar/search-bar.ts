import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, NgZone, inject, ChangeDetectorRef, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnrichedSuggestion, PlaceResult, SuggestionPart } from '../../../core/models/search-bar.model';

declare const google: any;

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Output() placeSelected = new EventEmitter<PlaceResult>();

  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  query = '';
  isFocused = false;
  isLoading = false;
  showSuggestions = false;
  noResults = false;
  suggestions: EnrichedSuggestion[] = [];
  highlightedIndex = -1;
  isSelecting = false;

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private sessionToken: any = null;
  private lastQuery = '';

  ngAfterViewInit(): void {
    this.waitForGoogleMaps();
  }

  waitForGoogleMaps(): void {
    if (typeof google === 'undefined' || !google.maps?.places?.AutocompleteSuggestion) {
      setTimeout(() => this.waitForGoogleMaps(), 300);
      return;
    }
    this.refreshSessionToken();
  }

  private refreshSessionToken(): void {
    try {
      this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    } catch {
      this.sessionToken = null;
    }
  }

  onInput(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.highlightedIndex = -1;

    const trimmed = this.query.trim();
    if (!trimmed) {
      this.suggestions = [];
      this.showSuggestions = false;
      this.isLoading = false;
      this.noResults = false;
      this.lastQuery = '';
      return;
    }
    this.isLoading = true;
    this.noResults = false;
    this.showSuggestions = true;
    const delay = trimmed.length <= 2 ? 220 : 130;
    this.debounceTimer = setTimeout(() => this.fetchSuggestions(trimmed), delay);
  }

  async fetchSuggestions(queryText: string): Promise<void> {
    if (!google?.maps?.places?.AutocompleteSuggestion) {
      this.zone.run(() => { this.isLoading = false; this.showSuggestions = false; });
      return;
    }
    if (queryText === this.lastQuery && this.suggestions.length > 0) {
      this.zone.run(() => { this.isLoading = false; });
      return;
    }
    this.lastQuery = queryText;

    try {
      const requestOptions: any = { input: queryText };
      if (this.sessionToken) requestOptions.sessionToken = this.sessionToken;

      const { suggestions } = await google.maps.places.AutocompleteSuggestion
        .fetchAutocompleteSuggestions(requestOptions);

      this.zone.run(() => {
        if (suggestions?.length) {
          this.suggestions = suggestions.slice(0, 6).map((s: any) => this.enrichSuggestion(s, queryText));
          this.noResults = false;
        } else {
          this.suggestions = [];
          this.noResults = true;
        }
        this.isLoading = false;
        this.showSuggestions = true;
        this.cdr.markForCheck();
      });
    } catch {
      this.zone.run(() => {
        this.isLoading = false;
        this.suggestions = [];
        this.noResults = true;
        this.showSuggestions = true;
      });
    }
  }

  private enrichSuggestion(s: any, queryText: string): EnrichedSuggestion {
    const mainText: string = s.placePrediction?.mainText?.text ?? '';
    const secondary: string = s.placePrediction?.secondaryText?.text ?? '';
    return { raw: s, mainParts: this.buildHighlightParts(mainText, queryText), secondary };
  }

  private buildHighlightParts(text: string, query: string): SuggestionPart[] {
    if (!query || !text) return [{ text, highlight: false }];
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return [{ text, highlight: false }];
    const parts: SuggestionPart[] = [];
    if (idx > 0) parts.push({ text: text.slice(0, idx), highlight: false });
    parts.push({ text: text.slice(idx, idx + query.length), highlight: true });
    if (idx + query.length < text.length) parts.push({ text: text.slice(idx + query.length), highlight: false });
    return parts;
  }

  async selectSuggestion(enriched: EnrichedSuggestion): Promise<void> {
    if (this.isSelecting) return;
    this.isSelecting = true;

    const prediction = enriched.raw.placePrediction;
    this.query = prediction.text.text;
    this.showSuggestions = false;
    this.suggestions = [];
    this.noResults = false;
    this.highlightedIndex = -1;

    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: ['location', 'id', 'displayName', 'photos'] });
      const photoURI = place.photos?.[0]?.getURI({ maxWidth: 400, maxHeight: 300 }) ?? undefined;

      const result: PlaceResult = {
        placeId: place.id,
        displayName: place.displayName ?? prediction.mainText?.text ?? prediction.text.text,
        description: prediction.text.text,
        lat: place.location.lat(),
        lng: place.location.lng(),
        photoURI,
      };

      this.refreshSessionToken();
      this.lastQuery = '';

      this.zone.run(() => {
        this.placeSelected.emit(result);
        this.isSelecting = false;
      });
    } catch (err) {
      console.error('[SearchBar] fetchFields error:', err);
      this.isSelecting = false;
    }
  }

  onArrowDown(event: Event): void {
    event.preventDefault();
    if (!this.suggestions.length) return;
    this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.suggestions.length - 1);
  }

  onArrowUp(event: Event): void {
    event.preventDefault();
    if (!this.suggestions.length) return;
    this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
  }

  onEnter(event: Event): void {
    event.preventDefault();
    if (this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
      this.selectSuggestion(this.suggestions[this.highlightedIndex]);
    } else if (this.suggestions.length > 0) {
      this.selectSuggestion(this.suggestions[0]);
    }
  }

  onBlur(): void {
    setTimeout(() => {
      this.isFocused = false;
      this.showSuggestions = false;
    }, 200);
  }

  clear(): void {
    this.query = '';
    this.suggestions = [];
    this.showSuggestions = false;
    this.isLoading = false;
    this.noResults = false;
    this.highlightedIndex = -1;
    this.lastQuery = '';
    this.searchInput?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }
}