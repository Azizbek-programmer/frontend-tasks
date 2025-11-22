import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TaskList {
  title: string;
  id?: number;
  description: string;
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["task_list"],

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3600",
    headers: {
      Authorization: "aowgfhkajnpiabwoufhawpmawipndawn",
    },
  }),
  endpoints: (build) => ({
    getTasksList: build.query<TaskList[], string>({
      query: (name) => ({
        url: name,
      }),
      providesTags: ["task_list"],
    }),

    getTaskDetail: build.query<TaskList, string>({
      query: (id) => `/tasks/${id}`,
    }),

    deleteTask: build.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task_list"],
    }),

    createTask: build.mutation({
      query: (data: TaskList) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["task_list"],
    }),
  }),
});

export const {
  useGetTasksListQuery,
  useGetTaskDetailQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
} = taskApi;
