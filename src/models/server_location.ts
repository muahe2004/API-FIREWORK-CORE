export interface ServerLocationModel {
  location_id: number;
  location_name: string;
  level: number;
  parent_id: number;
  sort_order: number;
  active_flag: number;
  created_by_user_id: string;
  created_date_time: Date;
  lu_updated: Date;
  lu_user_id: string;
}
