import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from '../models/IContact';
import { ContactService } from '../services/contact.service';
import { IGroup } from '../models/IGroup';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss'],
})
export class ViewContactComponent implements OnInit {
  profile = '../assets/profile.png';
  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public group: IGroup = {} as IGroup;
  public errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactservice: ContactService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.loading = true;
      this.contactservice.getContact(this.contactId).subscribe(
        (data: IContact) => {
          this.contact = data;
          this.loading = false;
          this.contactservice.getGroup(data).subscribe((data: IGroup) => {
            this.group = data;
          });
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }
  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group);
  }
}
