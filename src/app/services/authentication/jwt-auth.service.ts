import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, AUTHENTICATED_USER, TOKEN } from 'src/app/constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  constructor(private http: HttpClient) { }

  executeJwtAuth(username: string, password: string) {
    return this.http.post<any>(
      `${API_URL}/authenticate`,{
        username: username,
        password: password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  }

  isUserLoggedIn() {
    return sessionStorage.getItem(AUTHENTICATED_USER) != null;
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}
