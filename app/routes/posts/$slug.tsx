import Post from "~/components/Post";
import { useLoaderData } from "@remix-run/react";
import type { PostData } from "~/loaders/getPost";
import type { LoaderFunction } from "@remix-run/server-runtime";
import getPost from "~/loaders/getPost";

export const loader: LoaderFunction = async (args) => {
    const post = await getPost(args);
    return post
}

export default () => {
    const { 
            post, 
            html 
    } = useLoaderData<PostData>();
    return <Post
                post={post} 
                html={html}
            />
}
