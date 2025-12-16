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
  limit: number;
}

export interface TeacherList {
  createdAt: string;
  avatarUrl: string;
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
  specifications: {
    category: string;
    id: string;
    name: string;
  }[];
  updatedAt: string;
  username: string;
}

export interface TeacherField {
  username: string;
  password?: string;
  specification:string[];
  name: string;
}

export interface TeacherDetailT {
  statusCode: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: {
    createdAt: string;
    avatarUrl: string;
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
    specifications: {
      category: string;
      id: string;
      name: string;
    }[];
    updatedAt: string;
    username: string;
  };
}

export interface Specifications {
  data: {
    category: string;
    id: string;
    name: string;
  }[];
}

export interface GroupDetailT {
  statusCode: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: {
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    startTime: string;
    endTime: string;
    durationInMonths: number;
    teacherId: string;
    teacher: {
      id: string;
      name: string;
      username: string;
      avatarUrl: string;
      role: string;
      specifications: {
        id: string;
        name: string;
      }[];
    };
    students: {
      id: string;
      name: string;
      username: string;
      phone: string;
      isActive: boolean;
    }[];
  };
}