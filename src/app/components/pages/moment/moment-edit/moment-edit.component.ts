import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Moment } from 'src/app/Moment';

import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-moment-edit',
  templateUrl: './moment-edit.component.html',
  styleUrls: ['./moment-edit.component.css'],
})
export class MomentEditComponent {
  btnText: string = 'Salvar';
  moment!: Moment;

  constructor(
    private momentService: MomentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  editHandler(event: any) {}
}
