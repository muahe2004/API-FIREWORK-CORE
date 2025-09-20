export interface RolePermission {
    role_permission_id: string,
    role_function_id: string,
    action_code: string,
    description: string,
    active_flag: number,
    created_by_user_id: string,
    created_date_time: Date,
    lu_updated: Date,
    lu_user_id: string
}