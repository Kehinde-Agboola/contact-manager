import { Component, OnInit } from '@angular/core';
import { IContact } from '../models/IContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss'],
})
export class ContactManagerComponent implements OnInit {
  profile = '../assets/profile.png';

  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // this.loading = true;
    this.getAllContactFromServer();
  }
  public getAllContactFromServer() {
    this.contactService.getAllContacts().subscribe(
      (data: IContact[]) => {
        this.contacts = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
  deleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactService.deleteContact(contactId).subscribe((data: {}) => {
        this.getAllContactFromServer();
      });
    }
  }
}
