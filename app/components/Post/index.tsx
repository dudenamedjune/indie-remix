import type { Post } from '~/models/post.server';
export default function PostSlug({ post, html }: { post: Post; html: string }) {

    return (
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                {post.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    );
}