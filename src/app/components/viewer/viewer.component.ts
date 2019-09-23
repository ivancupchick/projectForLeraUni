import { Component, OnInit } from '@angular/core';
import { ViewerService } from 'src/app/service/viewer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  public textContent: string;

  constructor(private viewerService: ViewerService, private router: Router) { }

  ngOnInit() {
    const content = this.viewerService.getTextContent();

    if (!content) {
      this.router.navigateByUrl('text-list');
    }

    this.textContent = this.viewerService.getTextContent();
  }
}
