import { updatePost } from "~/models/post.server";
import { redirect } from "@remix-run/node";

export type ActionData =
    | {
        title: null | string;
        slug: null | string;
        markdown: null | string;
    }
    | undefined;

export const updatePostAction = async ({
    title,
    slug,
    markdown,
}: { title: string, slug: string, markdown: string }) => {

    await updatePost({ title, slug, markdown });

    return redirect("/posts/admin");
};

export default updatePostAction;

