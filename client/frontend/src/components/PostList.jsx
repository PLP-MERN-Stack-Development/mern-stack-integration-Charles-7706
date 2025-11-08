import { useState } from 'react'
import { useEffect } from 'react'
import {blog} from '../lib/api.js'
import { Card, CardContent, CardHeader } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { AlignHorizontalSpaceAround } from 'lucide-react';

const PostsList = ({handleNewPostClick}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blog.list(); // fetch-based API
        setPosts(data);
      } catch (err) {
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <div className='flex justify-between w-full mb-4 max-w-xl'>
      <h1 className='mb-2 text-slate-800 text-xl font-bold'>Posts</h1>
      <Button 
      onClick={handleNewPostClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] flex items-center gap-2 m-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        Add Post
      </Button>
      </div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Card className="bg-white border border-slate-200 rounded p-4 mb-4 w-full max-w-xl">
                <CardHeader className="p-0 mb-2 border-0">
                  <h3 className="text-base font-semibold text-slate-800 mb-1">{(post.title).toUpperCase()}</h3>
                </CardHeader>
                <CardContent className="p-0 text-slate-700 text-sm">
                  <p className="mb-2">{post.content}</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <span>Posted {new Date().toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};
export default PostsList;