export interface Product {
    product_id: string;
    product_code: string;
    product_name: string;
    image_url: string;
    type_id: string;
    price: string;
    stock: string;
    unit: string;
    description: string;
    active_flag: number;
    createdAt: Date;
    updatedAt: Date;
}