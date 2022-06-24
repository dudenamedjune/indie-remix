import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";
import { marked } from "marked";
import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";

export type PostData = { post: Post; html: string };

const useGetPost: LoaderFunction = async ({
    params,
}) => {
    invariant(params.slug, `params.slug is required`);

    const post = await getPost(params.slug);
    invariant(post, `Post not found: ${params.slug}`);

    const html = marked(post.markdown);
    return json<PostData>({ post, html });
};

export default useGetPost;