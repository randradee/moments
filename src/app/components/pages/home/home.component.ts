import { Component, OnInit } from '@angular/core';

import { MomentService } from '../../../services/moment.service';

import { Moment } from 'src/app/Moment';
import { Response } from 'src/app/Response';

import { environment } from 'environments/environment';

// import { faSearch } from '@fontawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  moments: Moment[] = [];
  filteredMoments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;
  apiUrl = `${this.baseApiUrl}/moments`;

  // todo search

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.moments = data;
      this.filteredMoments = data;
    });
  }
}
