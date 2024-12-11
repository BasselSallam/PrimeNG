import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule,MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: any[] = [];

  pages = [
    {
      page: 'Home',
      menuItem: [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/' },
      ],
    },
    {
      page: 'Profile',
      menuItem: [
        {
          label: 'Edit Profile',
          icon: 'pi pi-user-edit',
          routerLink: '/profile',
        },
      ],
    },
    {
      page: 'Settings',
      menuItem: [
        { label: 'Configuration', icon: 'pi pi-cog', routerLink: '/settings' },
      ],
    },
  ];

  // Simulate page change and update sidebar menu
  updateMenu(page: string) {
    const selectedPage = this.pages.find((p) => p.page === page);
    this.menuItems = selectedPage ? selectedPage.menuItem : [];
  }

  // Initialize with default menu
  ngOnInit() {
    this.updateMenu('Home');
  }
}
