import { createPost } from "~/models/post.server";
import { redirect } from "@remix-run/node";

export type ActionData =
    | {
        title: null | string;
        slug: null | string;
        markdown: null | string;
    }
    | undefined;

export const createPostAction = async ({
    title,
    slug,
    markdown,
}: { title: string, slug: string, markdown: string }) => {

    await createPost({ title, slug, markdown });

    return redirect("/posts/admin");
};

export default createPostAction;

