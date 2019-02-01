import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private aboutDialog: MatDialog) { }

  ngOnInit() {
  }

  showAbout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "about-dialog";
    dialogConfig.width = "25%";

    this.aboutDialog.open(AboutDialogComponent, dialogConfig);
  }
}