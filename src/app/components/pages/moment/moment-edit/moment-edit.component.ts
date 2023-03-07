import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Moment } from 'src/app/Moment';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

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
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  async editHandler(moment: Moment) {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    await this.momentService.editMoment(formData, id).subscribe();

    this.messagesService.addMessage('Momento editado com sucesso!');

    this.router.navigate([`moments/${id}`]);
  }
}
