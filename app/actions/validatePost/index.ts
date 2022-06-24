import invariant from "tiny-invariant";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
export type ActionData ={
        title: null | string;
        slug: null | string;
        markdown: null | string;
};
export const validatePost = async ({
    title,
    slug, 
    markdown,
}: ActionData) => {

    const errors: ActionData = {
        title: title ? null : "Title is required",
        slug: slug ? null : "Slug is required",
        markdown: markdown ? null : "Markdown is required",
    };
    const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    );
    if (hasErrors) {
        return json<ActionData>(errors);
    }
    invariant(
        typeof title === "string",
        "title must be a string"
    );
    invariant(
        typeof slug === "string",
        "slug must be a string"
    );
    invariant(
        typeof markdown === "string",
        "markdown must be a string"
    );
    return null
};

export default validatePost;