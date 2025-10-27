import { Suspense } from "react";
import { Author } from "./author";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default async function PostsSequentialPage() {
    // Fetch posts data from the API
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts: Post[] = await res.json()
    const filteredPosts = posts.filter(post => post.id % 10 === 1)

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Blog Posts (Sequential Fetching)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-gray-700">{post.body}</p>
                        <Suspense fallback={<div className="text-sm text-gray-500">Loading author...</div>}>
                        <Author userId={post.userId} />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    )
}