"use client"

import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default function UsersClient() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data: User[] = await res.json();
                setUsers(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }

        }
        fetchUsers();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <ul className="space-y-4 p-4">
            {users.map(user => (
                <li key={user.id} className="p-4 border rounded shadow">
                    <h2 className="text-lg font-bold">{user.name} ({user.username})</h2> 
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </li>
            ))}
        </ul>
    );
}