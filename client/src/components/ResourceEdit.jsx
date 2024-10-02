import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResourceForm from "./ResourceForm";
import { useSelector } from "react-redux";

const ResourceEdit = ({ isAdminView = false }) => {
  const [resources, setResources] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  const [selectedUser, setSelectedUser] = useState(
    !isAdminView ? currentUser : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminView) {
      fetchResources(currentUser._id);
    } else {
      fetchUsers();
    }
  }, []);

  const fetchResources = async (userId) => {
    try {
      const response = await fetch("/api/resource/read/" + userId);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const deleteResource = async (id) => {
    try {
      const response = await fetch(`/api/resource/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Refresh resources
      fetchResources(selectedUser._id);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/resource/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      throw new Error("Error fetching users:");
    }
  };

  const handleDownload = async (resourceId, resourceName) => {
    try {
      const res = await fetch(`/api/resource/download/${resourceId}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await res.blob();
      const urlObject = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObject;
      link.setAttribute("download", resourceName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject); // Clean up the URL object
    } catch (error) {
      console.error("Error downloading the file:", error.message);
    }
  };

  const handleAddResource = () => {
    setShowUploadForm(!showUploadForm);
  };

  const handleFormUploadSuccess = () => {
    setShowUploadForm(false);

    // Refresh resources
    fetchResources(selectedUser._id);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchResources(user._id);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
                          Resources Overview
                        </h2>
                        {isAdminView ? (
                          <span className="text-xs text-gray-500">
                            View and manage creation and updation of resources
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            View your resources
                          </span>
                        )}
                      </div>
                      {isAdminView && (
                        <button
                          onClick={handleAddResource}
                          className="text-sm font-semibold bg-green-200 text-green-900 hover:bg-green-400 py-2 px-4 rounded"
                        >
                          Add New Resource
                        </button>
                      )}
                    </div>
                    {showUploadForm && (
                      <ResourceForm
                        onUploadSuccess={handleFormUploadSuccess}
                        selectedUser={selectedUser}
                      />
                    )}

                    <div className="flex flex-col mt-4">
                        <div className="overflow-y-hidden rounded-lg border">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-indigo-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                  <th className="px-5 py-3">Name</th>
                                  <th className="px-5 py-3">Downloads</th>
                                  <th className="px-5 py-3">Description</th>
                                  <th className="px-5 py-3">View</th>
                                  {isAdminView && (
                                    <th className="px-5 py-3">Delete</th>
                                  )}
                                  {!isAdminView && (
                                    <th className="px-5 py-3">Download</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="text-gray-500">
                                {resources
                                  .filter(
                                    (resource) =>
                                      resource.uploadedBy === "admin"
                                  )
                                  .map((resource) => (
                                    <tr key={resource._id}>
                                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">
                                          {resource.resourceName}
                                        </p>
                                      </td>

                                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">
                                          {resource.downloadCount}
                                        </p>
                                      </td>

                                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm max-w-48">
                                        {/* Adjust max-w-48 as needed for maximum width */}
                                        <p className="whitespace-pre-wrap">
                                          {resource.resourceDescription}
                                        </p>
                                      </td>

                                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <a
                                          href={resource.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900"
                                        >
                                          View
                                        </a>
                                      </td>

                                      {isAdminView && (
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                          <button
                                            className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-900"
                                            onClick={() =>
                                              deleteResource(resource._id)
                                            }
                                          >
                                            Delete
                                          </button>
                                        </td>
                                      )}

                                      {!isAdminView && (
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                          <button
                                            onClick={() =>
                                              handleDownload(
                                                resource._id,
                                                resource.resourceName
                                              )
                                            }
                                            className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-900"
                                          >
                                            Download
                                          </button>
                                        </td>
                                      )}
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                            <span className="text-xs text-gray-600 sm:text-sm">
                              {" "}
                              Showing{" "}
                              {
                                resources.filter(
                                  (resource) => resource.uploadedBy === "admin"
                                ).length
                              }{" "}
                              Entries{" "}
                            </span>
                            <div className="mt-2 inline-flex sm:mt-0"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-lg text-gray-400">Please select a user</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceEdit;
