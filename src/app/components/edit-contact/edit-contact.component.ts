import { Component } from '@angular/core';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent {
  profile = '../assets/profile.png';

  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe(
        (data: IContact) => {
          this.contact = data;
          this.loading = false;
          this.contactService.getAllGroups().subscribe((data: IGroup[]) => {
            this.groups = data;
          });
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }
  submitUpdate() {
    if (this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe(
        (data: IContact) => {
          this.router.navigate(['/']).then();
        },
        (error) => {
          this.errorMessage = error;
          this.router.navigate(['/contacts/edit/${this.contactId}']).then();
        }
      );
    }
  }
}
