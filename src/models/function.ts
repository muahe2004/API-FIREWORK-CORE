export interface FunctionModel {
    function_id: string; 
    parent_id :string; 
    function_name :string;
    url: string;
    description: string;
    sort_order: number;
    level: number;
    active_flag: number;
    created_by_user_id: string;
    created_date_time: Date;
    lu_updated: Date;
    lu_user_id: string
}