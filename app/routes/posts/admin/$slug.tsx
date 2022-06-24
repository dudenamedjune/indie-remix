import { Form, useActionData, useTransition, } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import PostForm from '~/components/PostForm';
import { useLoaderData } from "@remix-run/react";
import updatePost from '~/actions/updatePost';
import deletePost from "~/actions/deletePost";

import type { LoaderFunction } from "@remix-run/server-runtime";
import getPost from "~/loaders/getPost";
import type { PostData } from "~/loaders/getPost";
import validatePost from "~/actions/validatePost";
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const action = formData.get("action") as string;
    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const markdown = formData.get("markdown") as string;

    if(action === "delete") {
        return await deletePost(slug as string);
    }
    const errors = await validatePost({ title, slug, markdown });
    if (errors) return errors;
    return await updatePost({ title, slug, markdown });
}

export const loader: LoaderFunction = async (args) => {
    const post = await getPost(args);
    return post
}

export default function NewPost() {
    const errors = useActionData();
    const transition = useTransition();
    const isCreating = Boolean(transition.submission);
    const {
        post,
        html
    } = useLoaderData<PostData>();

    return (
        <Form method="post" key={post.slug}>
            <PostForm
                title={post.title} 
                slug={post.slug}
                markdown={html}
                errors={errors}
                isCreating={isCreating}
            />
            <p className="text-right">
                <button
                    value="delete"
                    type="submit"
                    className="rounded bg-red-500 mr-2 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
                    disabled={isCreating}
                    name="action"
                >
                    {isCreating ? "Deleting..." : "delete"}
                </button>
                <button
                    type="submit"
                    className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                    disabled={isCreating}
                >
                    {isCreating ? "Updating..." : "update"}
                </button>
            </p>
        </Form>
        
   );
}