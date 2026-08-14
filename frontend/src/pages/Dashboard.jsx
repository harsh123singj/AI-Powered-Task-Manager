import React from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [tasks, setTask] = useState([]);
    const userName = localStorage.getItem("userName") || "User"

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("pending")
    const [priority, setPriority] = useState("medium")
    const [dueDate, setDueDate] = useState("")
    const [editTaskId, setEditTaskId] = useState(null);
    const [showAddTask, setShowAddTask] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");




    const filteredTasks = tasks.filter(task => {
        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || task.status === statusFilter;

        const matchesPriority =
            priorityFilter === "all" || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        if (sortBy === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }

        if (sortBy === "dueDate") {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;

            return new Date(a.dueDate) - new Date(b.dueDate);
        }

        if (sortBy === "priority") {
            const priorityOrder = {
                high: 1,
                medium: 2,
                low: 3
            };

            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }

        return 0;
    });



    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus("pending");
        setPriority("medium");
        setDueDate("");
        setEditTaskId(null);
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("")
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);


    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);


    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4001/api/tasks",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTask(response.data);

            } catch (error) {
                setErrorMessage(
                    error.response?.data?.message || "Something went wrong"
                );
            }
        };

        fetchTasks();

    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();


        const token = localStorage.getItem("token");

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:4001/api/tasks", {
                title,
                description,
                status,
                priority,
                dueDate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )

            setTask(prevTasks => [response.data, ...prevTasks]);
            setMessage("Task created successfully!");
            setShowAddTask(false);

            resetForm();




        }
        catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Something went wrong"
            );
        }
        finally {
            setLoading(false)
        }
    }

    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(
                `http://localhost:4001/api/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )

            setTask(prevTasks =>
                prevTasks.filter(task => task._id !== taskId)
            )

            setMessage("Task Deleted successfully!");


        }
        catch (error) {
            setErrorMessage(error.response?.data?.message || "Something Went Wrong");

        }
    }


    const handleEdit = (task) => {
        setEditTaskId(task._id);

        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);

        setDueDate(
            task.dueDate
                ? new Date(task.dueDate).toISOString().split("T")[0]
                : ""
        );

        setShowAddTask(true);
    };



    const handleUpdateTask = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        setLoading(true);

        try {
            const response = await axios.put(
                `http://localhost:4001/api/tasks/${editTaskId}`,
                {
                    title,
                    description,
                    status,
                    priority,
                    dueDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTask(prevTasks =>
                prevTasks.map(task =>
                    task._id === editTaskId ? response.data : task
                )
            );

            setMessage("Task Updated successfully!");
            setShowAddTask(false);
            setEditTaskId(null);

            resetForm();

        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Something Went Wrong");
        }
        finally {
            setLoading(false)
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">

            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

                    <div>
                        <p className="text-emerald-600 font-semibold text-sm mb-2">
                            YOUR DASHBOARD
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Good morning, {userName}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Here's what's happening with your tasks today.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowAddTask(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition">
                        + Add Task
                    </button>

                </div>

                {errorMessage && (
                    <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-white border border-red-200 shadow-xl rounded-xl px-5 py-4 min-w-[280px]">

                        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                            !
                        </div>

                        <div>
                            <p className="font-semibold text-gray-900">
                                Error
                            </p>

                            <p className="text-sm text-gray-500">
                                {errorMessage}
                            </p>
                        </div>

                        <button
                            onClick={() => setErrorMessage("")}
                            className="ml-auto text-gray-400 hover:text-gray-700 text-lg"
                        >
                            ×
                        </button>

                    </div>
                )}

                {message && (
                    <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-white border border-emerald-200 shadow-xl rounded-xl px-5 py-4 min-w-[280px] animate-[slideIn_0.3s_ease-out]">

                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                            ✓
                        </div>

                        <div>
                            <p className="font-semibold text-gray-900">
                                Success
                            </p>

                            <p className="text-sm text-gray-500">
                                {message}
                            </p>
                        </div>

                        <button
                            onClick={() => setMessage("")}
                            className="ml-auto text-gray-400 hover:text-gray-700 text-lg"
                        >
                            ×
                        </button>

                    </div>
                )}


                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

                    {/* Total */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

                        <div className="flex items-center justify-between mb-5">

                            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">
                                📋
                            </div>

                            <span className="text-xs font-semibold text-gray-400 uppercase">
                                All Tasks
                            </span>

                        </div>

                        <p className="text-gray-500 text-sm">
                            Total Tasks
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-1">
                            {tasks.length}
                        </h2>

                    </div>


                    {/* Pending */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

                        <div className="flex items-center justify-between mb-5">

                            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                                ⏳
                            </div>

                            <span className="text-xs font-semibold text-gray-400 uppercase">
                                Pending
                            </span>

                        </div>

                        <p className="text-gray-500 text-sm">
                            Pending Tasks
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-1">
                            {tasks.filter(task => task.status === "pending").length}
                        </h2>

                    </div>


                    {/* Completed */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

                        <div className="flex items-center justify-between mb-5">

                            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                                ✅
                            </div>

                            <span className="text-xs font-semibold text-gray-400 uppercase">
                                Completed
                            </span>

                        </div>

                        <p className="text-gray-500 text-sm">
                            Completed Tasks
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-1">
                            {tasks.filter(task => task.status === "completed").length}
                        </h2>

                    </div>

                </div>


                {/* Tasks Section */}
                <section className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl shadow-sm p-6 md:p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Your Tasks
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                Keep track of everything you need to get done.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search tasks..."
                                    className="w-full sm:w-64 px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                />

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full sm:w-40 px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <select
                                    value={priorityFilter}
                                    onChange={(e) => setPriorityFilter(e.target.value)}
                                    className="w-full sm:w-40 px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                >
                                    <option value="all">All Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full sm:w-40 px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="dueDate">Due Date</option>
                                    <option value="priority">Priority</option>
                                </select>

                            </div>

                        </div>

                    </div>

                    {/* Empty State */}

                    {filteredTasks.length === 0 ? (

                        <div className="min-h-[250px] flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-xl">

                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl mb-4">
                                📝
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800">
                                {tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1 mb-5">
                                {tasks.length === 0
                                    ? "Create your first task and start getting things done."
                                    : "Try searching with a different keyword."}
                            </p>

                            {tasks.length === 0 && (
                                <button
                                    onClick={() => setShowAddTask(true)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
                                >
                                    Create Your First Task
                                </button>
                            )}

                        </div>

                    ) : (

                        <div className="space-y-4">
                            {sortedTasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >

                                    {/* Top Row */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                                        {/* Task Info */}
                                        <div className="flex-1">

                                            <div className="flex items-center gap-3 mb-2">

                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition">
                                                    {task.title}
                                                </h3>

                                                {/* Status */}
                                                <span
                                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${task.status === "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : task.status === "in-progress"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-amber-100 text-amber-700"
                                                        }`}
                                                >
                                                    {task.status}
                                                </span>

                                            </div>

                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {task.description}
                                            </p>

                                        </div>

                                        {/* Priority */}
                                        <span
                                            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${task.priority === "high"
                                                ? "bg-red-100 text-red-600"
                                                : task.priority === "medium"
                                                    ? "bg-orange-100 text-orange-600"
                                                    : "bg-emerald-100 text-emerald-600"
                                                }`}
                                        >
                                            {task.priority.toUpperCase()}
                                        </span>

                                    </div>


                                    {/* Bottom Row */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5 pt-4 border-t border-gray-100">

                                        {/* Due Date */}
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>📅</span>

                                            <span>
                                                {task.dueDate
                                                    ? new Date(task.dueDate).toLocaleDateString()
                                                    : "No due date"}
                                            </span>
                                        </div>


                                        {/* Actions */}
                                        <div className="flex items-center gap-2">

                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDeleteTask(task._id)}
                                                className="px-3 py-1.5 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>

                    )}

                </section>

            </main>


            {showAddTask && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editTaskId ? "Update your Task" : "Create New Task"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Add a task and keep your work organized.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddTask(false);
                                    resetForm();
                                }}
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition text-xl"
                            >
                                ×
                            </button>

                        </div>


                        {/* Form */}
                        <form onSubmit={editTaskId ? handleUpdateTask : handleCreateTask} className="p-6">

                            {/* Title */}
                            <div className="mb-4">

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Task Title
                                </label>

                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter task title"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                />

                            </div>


                            {/* Description */}
                            <div className="mb-4">

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                    placeholder="Describe your task..."
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                />

                            </div>


                            {/* Priority + Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                                {/* Priority */}
                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Priority
                                    </label>

                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>

                                </div>


                                {/* Status */}
                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Status
                                    </label>

                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>

                                </div>

                            </div>


                            {/* Due Date */}
                            <div className="mb-6">

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Due Date
                                </label>

                                <input
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    type="date"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                />

                            </div>


                            {/* Buttons */}
                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddTask(false);
                                        resetForm();
                                    }} className="px-5 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition flex items-center justify-center"                                >
                                    {loading ? <Loader /> : editTaskId ? "update Task" : "Create Task"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            <Footer />

        </div>
    );
};

export default Dashboard;