import { studentAPI } from "@/api/students"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "../../../template/students/table-columns"
import UserCreateForm from "@/template/students/create-form"

export default async function Students(){
    let students: Student[] = []
    try {
        const res = await studentAPI.all()
        students = res.data.data
        console.log(res.data.data)
    } catch (error) {
        console.log(error)
        // toast.error("something went wrong")
    }
    return <div>
        <div className="flex justify-end p-3">
            <UserCreateForm/>
        </div>
        <DataTable columns={columns} data={students}/>
    </div>
}