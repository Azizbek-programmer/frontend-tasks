export interface IResponse<T> {
  currentPage: number;
  pageSize: number;
  statusCode: number;
  to: number;
  totalElements: number;
  totalPages: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: T[];
}

export interface TeacherList {
  createdAt: string;
  groups: {
    createdAt: string;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    lessonTime: string;
    name: string;
    teacherId: string;
    updatedAt: string;
  }[];
  id: string;
  isActive: boolean;
  isDeleted: boolean;
  name: string;
  password: string;
  role: string;
  specification: string;
  updatedAt: string;
  username: string;
}
