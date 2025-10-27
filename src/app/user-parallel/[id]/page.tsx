type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
}

type Album = {
    userId: number;
    id: number;
    title: string;
}

async function getUserPosts(userId: string): Promise<Post[]> {
    //deliberate delay to see the parallel fetching effect
    await new Promise((resolve) => setTimeout(resolve, 2000));

const res=await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
return res.json();
}

async function getUserAlbums(userId: string): Promise<Album[]> {
        //deliberate delay to see the parallel fetching effect
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
const res=await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
return res.json();
}

export default async function UserProfile({params}:{params:Promise<{id:string}>}) {
const {id}=await params;
const [posts,albums]=await Promise.all([getUserPosts(id),getUserAlbums(id)]);

 return (
    <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Profile - {id}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h2 className="text-xl font-semibold mb-2">Posts</h2>
                {posts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition mb-4">
                        <h3 className="text-lg font-medium mb-1">{post.title}</h3>
                        <p className="text-gray-700">{post.body}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Albums</h2>
                {albums.map((album) => (
                    <div key={album.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition mb-4">
                        <h3 className="text-lg font-medium">{album.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    </div>
 )
}