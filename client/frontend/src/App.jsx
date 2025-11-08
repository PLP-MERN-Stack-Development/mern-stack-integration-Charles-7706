import { useState } from "react";
import PostsList from "./components/PostList";
import NewPost from "./components/NewPost";


function App() {
  const [showNewPost, setShowNewPost] = useState(false);

  const handleNewPostClick = () => {
    setShowNewPost(true); // show the NewPost component
  };

  const handleBackToPosts = () => {
    setShowNewPost(false); // hide NewPost and show PostsList
  };

  return (
    <div className="App">
      {showNewPost ? (
        <NewPost onBack={handleBackToPosts} />
      ) : (
        <PostsList handleNewPostClick={handleNewPostClick} />
      )}
    </div>
  );
}

export default App;
