export interface User { 
	employee_id: string;
	position_id: number;
	branch_id: number;
	department_id: number; 
	user_id: string,
	type: string,
	first_name: string,
	middle_name: string,
	last_name: string,
	full_name: string,
	avatar: string,
	gender: string,
	date_of_birth: Date,
	email: string,
	phone_number: string,
	user_name: string,
	online_flag: number,
	is_guest: number,
	description: string,
	password: string,
	created_by_user_id: string,
	created_date_time: Date,
	lu_user_id: string,
	lu_updated: Date; 
}
 