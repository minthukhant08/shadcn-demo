'use server'

import { studentAPI } from "@/api/students"
import { revalidatePath } from "next/cache"

export const deleteAction = async (id: number) => {
   try {
    await studentAPI.delete(id)
    revalidatePath("/students")
    return true
   } catch (error) {
    return false
   }
}

export const createAction = async (student: CreateStudentPayload) => {
   try {
      await studentAPI.create(student)
      revalidatePath("/students")
   } catch (error) {
   }
}