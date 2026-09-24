import { studentAPI } from "@/api/students"

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
        {
            students.map((stu) => <div key={stu.id}>{stu.name}</div>)
        }
    </div>
}