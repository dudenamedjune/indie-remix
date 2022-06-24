import { Form, useActionData, useTransition, } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import PostForm from '~/components/PostForm';
import createPost from '~/actions/createPost';
import validatePost from "~/actions/validatePost";
export const action: ActionFunction = async (args) => {
    const formData = await args.request.formData()
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const markdown = formData.get("markdown") as string;
    const errors = await validatePost({ title, slug, markdown });
    if(errors) return errors; 
    return await createPost({ title, slug, markdown });
}

export default function NewPost() {
    const errors = useActionData();
    const transition = useTransition();
    const isCreating = Boolean(transition.submission);
    return (
        <>
            <Form method="post">
            <PostForm
                errors={errors}
                isCreating={isCreating}
            />
          
                <p className="text-right">
                    <button
                        type="submit"
                        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                        disabled={isCreating}
                    >
                        {isCreating ? "Creating..." : "Create Post"}
                    </button>
                </p>
            </Form>
      
        </>
    );
}