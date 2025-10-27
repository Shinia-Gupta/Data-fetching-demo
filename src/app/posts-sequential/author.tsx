type Author = {
    id: number;
    name: string;
}

export async function Author({ userId }: { userId: number }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user: Author = await response.json();

    return (
        <div className="text-sm text-gray-500">
            Written By:{" "}
            <span className="font-medium">{user.name}</span>
        </div>
    )


}