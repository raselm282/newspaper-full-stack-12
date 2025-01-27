import React from "react";
import useUsers from "../Hooks/useUsers";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const [usersData, loading, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();
  console.log(usersData);

  // Handle making a user an admin
  // Handle making a user an admin
  // Handle making a user an admin  ds
  const makeAdmin = async (id, name, email, photo) => {
    const confirmAction = window.confirm(
      "Are you sure you want to make this user an admin?"
    );
    if (confirmAction) {
      const formData = {
        name,
        email,
        photo,
        isAdmin: true,
      };
      console.log(formData);
      try {
        // 1. make a post request
        await axiosSecure.put(`/users/${id}`, formData);
        // 2. Reset form
        // form.reset();
        // 3. Show toast and navigate
        toast.success("Data Updated Successfully!!!");
        // navigate("/dashboard/myMarathonList");
        refetch();
      } catch (err) {
        toast.error(err.message);
      }
    }
    // if (confirmAction) {
    //   await axiosSecure.put(`users/${id}`, {}, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    //     },
    //   });
    //   refetch(); // Refresh the user list after the update
    // }
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard || All Users</title>
      </Helmet>{" "}
      <div className="flex items-center gap-x-3">
        <p className="font-bold ml-12 my-12 text-3xl">Total Users Data: </p>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {usersData.length}
        </span>
      </div>
      <section className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">All Users</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Profile Picture</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">
                  <img
                    src={user?.photo}
                    alt={`${user.name}'s profile`}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  {user.isAdmin ? (
                    <span className="text-green-500 font-semibold">Admin</span>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() =>
                        makeAdmin(user._id, user.name, user.email, user.photo)
                      }
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AllUsers;
