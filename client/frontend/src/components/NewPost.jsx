import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { blog } from '../lib/api'
import { useState} from 'react'


export default function NewPost({onBack}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content };
        try {
            await blog.create(postData);
            setTitle('');
            setContent('');
            onBack(); // navigate back to posts list
            alert('Post created successfully!');
        }
        catch (error) {
            alert('Error creating post: ' + (error.message || error));
        }
    }

    return (
        <form className="max-w-xl mx-auto p-4 bg-white border border-slate-200 rounded shadow-sm" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="block mb-1 text-sm font-medium text-slate-700">Title</label>
                <Input id="title" name="title" type="text" placeholder="Post Title" required 
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="block mb-1 text-sm font-medium text-slate-700">Content</label>
                <Textarea id="content" name="content" rows="6" placeholder="Write your post here..." required 
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div className="flex gap-2 mt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Create Post</Button>
                <Button type="button" variant="secondary" className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded" onClick={onBack}>Cancel</Button>
            </div>
        </form>
    )
}