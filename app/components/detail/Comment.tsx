import { Rating } from "@mui/material";
import Avatar from "../general/Avatar";

const Comment = ({ prd }: { prd: any }) => {
  return (
    <div className="border p-2 w-full md:w-1/3 rounded-lg my-2">
      <div className="flex items-center gap-2">
        <Avatar />
        <div className="flex flex-col">
          <div>{prd.user.name}</div>
          <Rating name="read-only" value={prd?.user?.rating} readOnly />
        </div>
      </div>
      <div className="text-slate-500 mt-2">{prd.comment}</div>
    </div>
  );
};

export default Comment;
