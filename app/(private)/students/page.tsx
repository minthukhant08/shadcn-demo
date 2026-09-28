import { studentAPI } from "@/api/students"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "../../../template/students/table-columns"
import UserCreateForm from "@/template/students/create-form"
import { AppPagination } from "@/components/table-pagination"
import Search from "@/template/students/search"

export default async function Students({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { per_page, page , search } = await searchParams;
    let students: Student[] = []
    let pagination: Pagination
 
    const res = await studentAPI.all(`page=${page ?? 1}&per_page=${per_page??5}&search=${search}`)
    students = res.data.data.items
    pagination = res.data.data.pagination

    return <div>
        <div className="flex justify-between p-3">
            <Search/>
            <UserCreateForm />
        </div>
        <DataTable columns={columns} data={students} />
        <AppPagination
            current_page={pagination.current_page}
            per_page={pagination.per_page}
            total={pagination.total}
        />
    </div>
}