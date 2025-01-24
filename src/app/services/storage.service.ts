import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isBrowser?: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId:Object) { 
    this.isBrowser = isPlatformBrowser(this.platformId); // Checks if the platform is the browser
  }

  // Stores a key-value pair in localStorage
  set(key: string, value: any) {
    if (!value || !this.isBrowser) return; // If no value or not in a browser environment, do nothing
    const val = JSON.stringify(value); // Converts value to string
    localStorage.setItem(key, val); // Stores value in localStorage
  }
  // Retrieves a value from localStorage
  get(key: string) {
    if (!this.isBrowser) return null; // If not in a browser environment, return null
    const stringValue: string | null = localStorage.getItem(key); // Get the stringified value from localStorage
    if (stringValue) return JSON.parse(stringValue); // Parse and return the value if it exists
  }

  // Removes an item from localStorage
  remove(key: string) {
    if (!this.isBrowser) return; // If not in a browser environment, do nothing
    localStorage.removeItem(key); // Removes the item from localStorage
  }
}
