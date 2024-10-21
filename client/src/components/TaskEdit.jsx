import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm.jsx";
import { useSelector } from "react-redux";

const TaskEdit = ({ isAdminView = false }) => {
  const [tasks, setTasks] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedUser, setSelectedUser] = useState(
    !isAdminView ? currentUser : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminView && currentUser._id) {
      fetchTasks(currentUser._id);
    } else if (isAdminView) {
      fetchUsers();
    }
  }, [currentUser._id, isAdminView]);

  useEffect(() => {
    if (selectedUser) {
      fetchTasks(selectedUser._id);
    }
  }, [selectedUser]);

  const fetchTasks = async (userId) => {
    try {
      const response = await fetch(`/api/tasks/read/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Refresh tasks
      fetchTasks(selectedUser._id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/tasks/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddTask = () => {
    setShowUploadForm(!showUploadForm);
  };

  const handleFormUploadSuccess = () => {
    setShowUploadForm(false);

    // Refresh tasks
    fetchTasks(selectedUser._id);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

    try {
      const response = await fetch(`/api/tasks/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      await fetchTasks(selectedUser._id);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="h-screen flex overflow-hidden text-sm p-2">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="flex-grow flex overflow-x-hidden">
            {isAdminView && (
              <div className="w-96 flex-shrink-0 border-r border-gray-200 dark:border-gray-300 h-full overflow-y-auto lg:block hidden p-5">
                <div className="text-xs text-gray-400 tracking-wider">
                  USERS
                </div>

                <div className="relative mt-2">
                  <input
                    type="text"
                    className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 w-full rounded-md text-sm"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>

                <div className="space-y-4 mt-3">
                  {filteredUsers.map((user) => (
                    <button
                      key={user._id}
                      className={`p-3 w-full flex flex-col rounded-md dark:bg-gray-200 shadow ${
                        user._id === selectedUser?._id &&
                        "border-2 border-indigo-300"
                      }`}
                    >
                      <div
                        className="flex xl:flex-row flex-col items-center font-medium text-gray-900 pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full"
                        onClick={() => handleUserSelect(user)}
                      >
                        <img
                          src={user.avatar}
                          className="w-7 h-7 mr-2 rounded-full"
                          alt="profile picture"
                        />
                        {user.fullname}
                      </div>
                      <div className="flex items-center w-full overflow-hidden">
                        <div className="text-xs py-1 px-2 leading-none bg-indigo-500 text-white rounded-md">
                          {user.role}
                        </div>
                        <div className="ml-auto text-xs text-gray-500">
                          {user.username}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-grow overflow-y-auto">
              {selectedUser ? (
                <div className="w-full flex flex-col h-screen max-h-screen overflow-hidden">
                  <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                    <div className="flex items-center justify-between pb-6">
                      <div>
                        <h2 className="font-semibold text-gray-700">
                          Tasks Overview
                        </h2>
                        {isAdminView ? (
                          <span className="text-xs text-gray-500">
                            View and manage creation and updation of tasks
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            View your tasks and their status
                          </span>
                        )}
                      </div>

                      {isAdminView && (
                        <button
                          onClick={handleAddTask}
                          className="text-sm font-semibold bg-green-200 text-green-900 hover:bg-green-400 py-2 px-4 rounded"
                        >
                          Add New Task
                        </button>
                      )}
                    </div>
                    {showUploadForm && (
                      <TaskForm
                        onUploadSuccess={handleFormUploadSuccess}
                        selectedUser={selectedUser}
                      />
                    )}

                    <div className="flex flex-col mt-2">
                        <div className="overflow-y-hidden rounded-lg border">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-indigo-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                  <th className="px-5 py-3">Title</th>
                                  <th className="px-5 py-3">Description</th>
                                  <th className="px-5 py-3">Due Date</th>
                                  <th className="px-5 py-3">Status</th>
                                  {isAdminView ? (
                                    <>
                                      {/* <th className="px-5 py-3">Edit</th> */}
                                      <th className="px-5 py-3">Delete</th>
                                    </>
                                  ) : null}
                                </tr>
                              </thead>
                              <tbody className="text-gray-500">
                                {tasks
                                  .filter(
                                    (task) =>
                                      task.createdBy !== "admin"
                                  )
                                  .map((task) => (
                                    <tr key={task._id}>
                                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">
                                          {task.title}
                                        </p>
                                      </td>

                                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">
                                          {task.description}
                                        </p>
                                      </td>

                                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm max-w-48">
                                        <p className="whitespace-pre-line truncate">
                                          {task.dueDate}
                                        </p>
                                      </td>

                                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <button
                                          onClick={() =>
                                            handleStatusToggle(
                                              task._id,
                                              task.status
                                            )
                                          }
                                          className={`whitespace-no-wrap py-1 px-2 rounded text-white ${
                                            task.status === "pending"
                                              ? "bg-red-500"
                                              : "bg-green-500"
                                          }`}
                                        >
                                          {task.status}
                                        </button>
                                      </td>
                                      {isAdminView ? (
                                        <>
                                          {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                      <button className="whitespace-no-wrap py-1 px-2 rounded bg-blue-500 text-white">
                                        Edit
                                      </button>
                                    </td> */}
                                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <button
                                              onClick={() =>
                                                deleteTask(task._id)
                                              }
                                              className="whitespace-no-wrap py-1 px-2 rounded bg-red-500 text-white"
                                            >
                                              Delete
                                            </button>
                                          </td>
                                        </>
                                      ) : null}
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-gray-500 text-xl">
                    Please select a user
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
