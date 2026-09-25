import { studentAPI } from "@/api/students";

export default async function StudentDetail({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params;

    const res = await studentAPI.get(id)

    return <h1>{JSON.stringify(res.data.data)}</h1>;
}
