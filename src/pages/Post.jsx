import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config/config";
import { useState } from "react";
import { Container } from "../components";
import { useEffect } from "react";
import { Button } from "../components/common";
const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  let isAuthor = true;
  useEffect(() => {
    appwriteService.getPost(slug).then((response) => {
      setPost(response);
    });
  }, [slug]);
  const deletePost = () => {
    appwriteService.deletePost(slug).then((response) => {
      if (response) {
        navigate("/");
        appwriteService.deleteFile(post.featuredimage);
      }
    });
  };
  if (!post) return null;
  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  );
};

export default Post;
