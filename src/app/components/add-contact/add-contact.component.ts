import { Component } from '@angular/core';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];
  constructor(private contactService: ContactService, private router: Router) {
    console.log(contactService);
  }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe(
      (data: IGroup[]) => {
        this.groups = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
  public createSubmit() {
    this.contactService.createContact(this.contact).subscribe(
      (data: IContact) => {
        this.router.navigate(['/']).then();
      },
      (error) => {
        this.errorMessage = error;
        this.router.navigate(['/contacts/add']).then();
      }
    );
  }
}
// console.log(contact)
// public isNotEmpty() {
//   return Object.keys(this.contact).length > 0 && Object.keys(this.group);
// }
// }
