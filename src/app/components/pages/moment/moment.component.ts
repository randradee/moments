import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

import { Moment } from 'src/app/Moment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  async deleteMoment() {
    const thisMomentId = this.activatedRoute.snapshot.paramMap.get('id');
    const message = await this.momentService
      .deleteMoment(Number(thisMomentId))
      .subscribe((item) => {
        return item.message;
      });
    console.log(message.toString());
    if (message.toString() == `Momento ${thisMomentId} excluído com sucesso`) {
      this.messagesService.addMessage('Momento criado com sucesso!');
      this.router.navigate(['/']);
    }
  }
}
