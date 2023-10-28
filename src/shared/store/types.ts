export interface IRequest {
  createdAt: string;
  fullName: string;
  phone: string;
  type: string;
  quantity: number;
  cityId: number;
  call: boolean;
  id: string;
}

export interface ICity {
  cityName: string;
  id: string;
}
