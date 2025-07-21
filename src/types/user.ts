export interface UserId {
  id: number;
}
export interface UserMainInfo {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface UserDetailInfo {
  company: Company;
  address: Address;
}

export type User = UserId & UserMainInfo & UserDetailInfo;

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

