import { Component, OnInit } from '@angular/core';
import { ViewerService } from 'src/app/service/viewer.service';
import { Router } from '@angular/router';
import {MainService, TextResponse} from '../../service/main.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  public text: TextResponse;

  constructor(private viewerService: ViewerService,
              private mainService: MainService,
              private router: Router) { }

  ngOnInit() {
    const textContent = this.viewerService.getTextContent();
    if (!textContent || !textContent.data) {
      this.router.navigateByUrl('text-list');
      return;
    }

    const content = textContent.data;
    this.text = this.viewerService.getTextContent();
  }

  editText() {
    this.mainService.saveText(this.text).subscribe((res) => {
      this.router.navigateByUrl('text-list');
    });
  }

  cancelEdit() {
    this.router.navigateByUrl('text-list');
  }
}
