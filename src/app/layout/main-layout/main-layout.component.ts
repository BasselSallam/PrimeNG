import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [FooterComponent, SidebarComponent, RouterOutlet, PanelModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
