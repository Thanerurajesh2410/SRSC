export interface CreateCommitteeDto {
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface UpdateCommitteeDto {
  name?: string;
  designation?: string;
  phone?: string;
  email?: string;
  address?: string;
  isActive?: boolean;
}