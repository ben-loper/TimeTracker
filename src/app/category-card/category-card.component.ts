import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() categoryName?: string;
  @Input() hours?: number;
  @Input() minutes?: number;

}
