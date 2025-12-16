import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";


export interface EvaluateStudentDto {
grade: number;
behavior?: string;
}


export const useEvaluateStudent = (studentId: string) => {
return useMutation({
mutationFn: (data: EvaluateStudentDto) =>
request.patch(`/student/evaluate/${studentId}`, data).then(res => res.data),
});
};