import { deletePost } from "~/models/post.server";
import { redirect } from "@remix-run/node";

export const deletePostAction = async (slug: string) => {
    await deletePost(slug);
    return redirect("/posts/admin");
};

export default deletePostAction;

