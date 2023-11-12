import { useEffect } from "react";
import service from "../appwrite/config/config";
import { Card as PostCard } from "../components/common";
import { useState } from "react";
import { Container } from "../components";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts().then((response) => {
      if (response) setPosts(response.documents);
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => {
            console.log(post);
            return (
              <div  className='p-2 w-1/4' key={post.$id}>
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
