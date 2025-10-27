export default function Loading() {
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Loading User Profile...</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Posts</h2>
                    <p>Loading posts...</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Albums</h2>
                    <p>Loading albums...</p>
                </div>
            </div>
        </div>
    );
}