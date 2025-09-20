export interface EcusServerModel {
  server_name: string;
  note: string;
  additional_info: any;
  location_id: number;
  last_signal: Date;
  active_flag: number;
  created_by_user_id: string;
  created_date_time: Date;
  lu_updated: Date;
  lu_user_id: string;
}

export interface SearchEcusServerModel {
  pageIndex: string;
  pageSize: number;
  search_content: string;
  location_id: number;
}
