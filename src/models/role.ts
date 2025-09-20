export interface Role {
    role_id: string,
    role_code: string,
    role_name: string,
    description: string,
    active_flag: number,
    created_by_user_id: string,
    created_date_time: Date,
    lu_updated: Date,
    lu_user_id: string
}