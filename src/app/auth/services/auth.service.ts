import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  addUser(user:User):Observable<User>{
    return this.http.post<User>('http://localhost:3000/users', user);
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  isLogged(){
    let admin =  localStorage.getItem('isLogged');
    if(admin == 'logged'){
      return true;
    }
    return false;
  }
}
