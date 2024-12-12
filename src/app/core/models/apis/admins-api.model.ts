import { AdminsData, SingleAdminData } from '../admin.model';
import { BaseAPIResponse } from './api-mock.model';

export interface AdminsAPIResponse extends BaseAPIResponse {
  data: AdminsData;
}

export interface AdminAPIResponse extends BaseAPIResponse {
  data: SingleAdminData;
}
