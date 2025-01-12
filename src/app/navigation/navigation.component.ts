import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}
