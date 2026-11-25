import { PROJECTS } from "@/app/components/Section/Projects/projectsData";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.id,
    }));
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <ProjectDetailClient slug={slug} />;
}
