import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBar } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CustomerService } from '../customers.service';
import { SortEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { Option } from '../../../core/models/option.model';
import { PaginatorModule } from 'primeng/paginator';

export interface TableColumn {
  id: number;
  name: string;
  key: string;
  sortable?: boolean;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    TagModule,
    SelectModule,
    MultiSelectModule,
    ProgressBar,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SliderModule,
    DropdownModule,
    FormsModule,
    PaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  private adminsService: CustomerService = inject(CustomerService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  protected adminsData = this.adminsService.adminsData;
  protected metadata = this.adminsService.metadata;

  protected httpParams = signal<HttpParams>(
    new HttpParams().set('page', 1).set('limit', 15)
  );
  protected exportExcelURL = signal(
    `${environment.base_url}/export`
  ).asReadonly();
  protected isLoading = signal<boolean>(true);

  protected filterForm: FormGroup = this.formBuilder.group({
    status: [null],
  });

  protected tableColumns = signal<TableColumn[]>([
    {
      id: 1,
      name: 'Created At',
      key: 'createdAt',
      sortable: true,
    },
    {
      id: 2,
      name: 'Name',
      key: 'name',
      sortable: true,
    },
    {
      id: 3,
      name: 'Email',
      key: 'email',
      sortable: false,
    },
    {
      id: 4,
      name: 'Phone',
      key: 'phone',
      sortable: false,
    },
    {
      id: 5,
      name: 'Status',
      key: 'isActive',
      sortable: false,
    },
    {
      id: 6,
      name: 'Action',
      key: 'action',
      sortable: false,
    },
  ]).asReadonly();

  protected statusOptions = signal<Option[]>([
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Invited', value: 'invited' },
  ]).asReadonly();

  protected GendeOptions = signal<Option[]>([
    { label: 'Male', value: 'active' },
    { label: 'Femal', value: 'inactive' },
  ]).asReadonly();

  first: number = 1;

  rows: number = 15;

  matchModes = [
    { label: 'Match All', value: 'matchAll' },
    { label: 'Equals', value: 'equals' },
  ];

  constructor() {
    // effect(
    //   () => {
    //     // Synchronize HttpParams with the current page
    //     const currentPage = this.tableService.page();
    //     this.httpParams.update((oldParams) =>
    //       oldParams.set('page', currentPage)
    //     );

    //     // Synchronize HttpParams with the current search term
    //     const searchTerm = this.tableService.delayedSearchTerm();
    //     if (searchTerm)
    //       this.httpParams.update((oldParams) =>
    //         oldParams.set('searchTerm', searchTerm)
    //       );
    //     if (!searchTerm)
    //       this.httpParams.update((params) => params.delete('searchTerm'));
    //   },
    //   { allowSignalWrites: true }
    // );

    // effect(
    //   () => {
    //     // This effect synchronizes the totalRecords signal with the latest metadata from the AdminsService.
    //     // It fetches the metadata and updates the totalRecords signal with the totalRecords value.
    //     const syncMetadata = this.adminsService.metadata();
    //     this.tableService.totalRecords.set(syncMetadata.totalRecords);
    //   },
    //   { allowSignalWrites: true }
    // );

    effect(
      () => {
        // This effect synchronizes the admins data signal with the latest data from the AdminsService.
        // It calls the getAdmins() method with the current HttpParams to fetch the admins data and updates the admins data signal.
        this.getAdmins(this.httpParams());
      },
      { allowSignalWrites: true }
    );
  }

  /**
   * Fetches the list of admins from the backend API using the provided HttpParams.
   *
   * @param params - HttpParams object containing query parameters for the request.
   */
  getAdmins(params: HttpParams) {
    this.isLoading.set(true);
    const destroyAdminsRef = this.adminsService
      .getAdmins(params)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe();

    this.destroyRef.onDestroy(() => {
      destroyAdminsRef.unsubscribe();
    });
  }

  /**
   * Clears all filters by resetting the filter form and updating the HttpParams accordingly.
   */
  // protected clearFilters() {
  //   this.filterForm.reset();
  //   handleHttpParams(this.filterForm.value, this.httpParams);
  // }

  // /**
  //  * Applies the current filter form values to the HttpParams.
  //  */
  // protected applyFilter() {
  //   handleHttpParams(this.filterForm.value, this.httpParams);
  // }

  clearHttp(dt: any) {
    dt.clear();
    this.httpParams.update((params) => new HttpParams().set('page', 1));
  }

  onPageChange(event: any) {
    console.log(event);

    this.httpParams.update((params) =>
      params.set('limit', event.rows).set('page', event.page + 1)
    );

    this.first = event.first;
    this.rows = event.rows;
  }

  sort(event: any) {
    console.log(event);

    this.httpParams.update((params) =>
      params
        .set('orderBy', event.field)
        .set('orderDirection', event.order === 1 ? 'ASC' : 'DESC')
    );
  }
}
