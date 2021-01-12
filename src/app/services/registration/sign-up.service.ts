import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private http: HttpClient
  ) { }

  register(username: string, password: string) {
    return this.http.post<any>(`${API_URL}/register`,
      {
        username,
        password
      });
  }

}
