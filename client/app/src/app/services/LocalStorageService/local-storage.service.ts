import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService
{
  setItem(key: string, value: any)
  {
    localStorage.setItem(key, value);
  }

  getItem(key: string): any
  {
    return localStorage.getItem(key);
  }

  setBool(key: string, value: boolean)
  {
    localStorage.setItem(key, String(value));
  }

  getBool(key: string): boolean
  {
    return localStorage.getItem(key) === 'true';
  }

  setObject(key: string, value: object)
  {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string): object
  {
    let value = localStorage.getItem(key);
    if (value)
    {
      return JSON.parse(value);
    }
    else
    {
      throw new Error('Cant parse null value! Object was not found in local storage');
    }
  }
}
