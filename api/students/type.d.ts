type Student = {
  id: number;
  batch_id: number | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  enrolled_at: string | null;
  status: "active" | "inactive";
  image: string | null;
  created_at: string;
  updated_at: string;
};

type CreateStudentPayload = Omit<Student, 'id', 'batch_id', 'created_at', 'updated_at'>
