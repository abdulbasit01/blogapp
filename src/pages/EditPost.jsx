import { useEffect } from "react";
import service from "../appwrite/config/config";
import { Form as PostForm } from "../components/common/index";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Container } from "../components";
const EditPost = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((dbPost) => {
        if (dbPost) {
          setPost(dbPost);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  if (!post) return null;
  return (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
