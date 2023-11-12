import appwriteSeervice from "../../../appwrite/config/config";
import { Link } from "react-router-dom";
const Card = ({ $id, title, featuredimage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-300 rounded-lg  p-4">
        <div className="w-full justify-center mb-4">
          <img src={appwriteSeervice.getFilePreview(featuredimage)} />
          <h2 className="text-xl font-bold">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
