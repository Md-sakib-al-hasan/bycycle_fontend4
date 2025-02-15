export interface TCurrenuser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    gender: 'Male' | 'Female' | 'other';
    role: 'superAdmin' | 'admin' | 'customer';
    status: 'inactive' | 'active';
}