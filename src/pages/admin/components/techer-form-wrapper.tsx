import { Spinner } from "@/components/ui/spinner"
import { useTeacherDetail } from "../service/query/useTeacherDetail"
import { TeacherForm } from "./teacher-form"

export const TecherFormWrapper = ({id, closeModal}: {id:string; closeModal: () => void}) => {
    const {data, isLoading} = useTeacherDetail(id)
    console.log(data);
    
  return (
    <div>
         {isLoading ? <Spinner/> : <TeacherForm closeModal={closeModal} teacherId={id} defaultValueData={data}/>}
    </div>
  )
}
 