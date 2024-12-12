import { inject, Injectable, signal } from '@angular/core';
import { BaseAPIResponse } from '../../core/models/apis/api-mock.model';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../env/environment';
import { Admin } from '../../core/models/admin.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MetaData } from '../../core/models/metadata.model';
import { APIS } from '../../core/enums/APIs';
import { AdminsAPIResponse } from '../../core/models/apis/admins-api.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  /** HTTP client for making API requests */
  private _http: HttpClient = inject(HttpClient);

  /** Signal containing array of admin users */
  private admins = signal<Admin[]>([]);

  /** Signal containing single admin user details */
  private singleAdmin = signal<Admin>({} as Admin);

  /** Signal containing metadata about admin list */
  private adminsMetadata = signal<MetaData>({} as MetaData);

  /** Read-only signal containing array of admin users */
  public readonly adminsData = this.admins.asReadonly();

  /** Read-only signal containing metadata about admin list */
  public readonly metadata = this.adminsMetadata.asReadonly();

  /** Read-only signal containing single admin user details */
  public readonly adminData = this.singleAdmin.asReadonly();

  /**
   * Fetches the list of admins from the backend API.
   *
   * @param params - HttpParams object containing query parameters for the request.
   * @returns Observable<AdminsAPIResponse> - An observable of the response from the API.
   */
  getAdmins(params: HttpParams): Observable<AdminsAPIResponse> {
    const URL = `${environment.base_url}`;
    return this._http.get<AdminsAPIResponse>(URL, { params }).pipe(
      map((response) => {
        this.admins.set(response.data.admins);
        this.adminsMetadata.set(response.data.metaData);
        return response;
      })
    );
  }
}
