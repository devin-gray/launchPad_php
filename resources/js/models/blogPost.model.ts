import type { UUID } from "crypto";
import type { Int32 } from "mongodb";

export interface IBlogPost{
    id: Int32;
    title: string;
    slug: string;
    keywords: string;
    content: string;
    published: boolean;
    publish_date: Date | null;
    category_id: number;
    preview_image: string;
    preview_image_path: string;
    summary: string;
    user_email: string;
    user_id: UUID;
}