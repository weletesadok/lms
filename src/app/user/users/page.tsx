import { IUser } from "@/models/user";
import { deleteUser, getUsers } from "@/slices/users";

export default async function UsersList() {
  const users: IUser[] = (await getUsers()) as IUser[];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold">
                {user.name.firstName} {user.name.fatherName}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm">Username: {user.userName}</p>
              <p className="text-sm">Phone: {user.phoneNumber.join(", ")}</p>
              <p className="text-sm">
                Address: {user.address.street1}, {user.address.city},{" "}
                {user.address.country}
              </p>
              <form action={deleteUserAction}>
                <input
                  type="hidden"
                  name="id"
                  value={String(user._id ?? "low")}
                />
                <button
                  type="submit"
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

async function deleteUserAction(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;

  await deleteUser(id);
}
