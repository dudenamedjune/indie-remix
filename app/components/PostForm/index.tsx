import { Form, Outlet } from "@remix-run/react";
const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;


export default function PostForm({
    errors,
    isCreating,
    title = "",
    slug = "", 
    markdown = "",
}: { 
    errors: any, 
    isCreating: boolean, 
    title?: string, 
    slug?: string, 
    markdown?: string 
}) {
    return (
        <>
            <p>
                <label>
                    Post Title:{" "}
                    {errors?.title ? (
                        <em className="text-red-600">{errors.title}</em>
                    ) : null}
                    <input type="text" name="title" className={inputClassName} defaultValue={title} />
                </label>
            </p>
            <p>
                <label>
                    Post Slug:{" "}
                    {errors?.slug ? (
                        <em className="text-red-600">{errors.slug}</em>
                    ) : null}
                    <input type="text" name="slug" className={inputClassName} defaultValue={slug}/>
                </label>
            </p>
            <p>
                <label htmlFor="markdown">
                    Markdown:{" "}
                    {errors?.markdown ? (
                        <em className="text-red-600">
                            {errors.markdown}
                        </em>
                    ) : null}
                </label>
                <br />
                <textarea
                    id="markdown"
                    rows={20}
                    name="markdown"
                    className={`${inputClassName} font-mono`}
                    defaultValue={markdown}
                />
            </p>
        </>
    );
}