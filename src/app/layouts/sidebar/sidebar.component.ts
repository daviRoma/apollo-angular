import { Component, OnInit } from '@angular/core';
import { LogOut, LogIn } from 'src/app/core/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private store: Store<AppState>


  constructor(
    
  ) { }

  ngOnInit(): void {
  }

  logoutFunction() {

    event.preventDefault();
    console.log('Performing Logout');
    this.store.dispatch(new LogOut());

  }

}
