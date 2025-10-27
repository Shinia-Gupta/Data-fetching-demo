type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default async function UsersServer() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
const users:User[]=await res.json()
// console.log("users - ",users);

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