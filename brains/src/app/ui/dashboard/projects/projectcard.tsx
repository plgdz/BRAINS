// projectcard.tsx
// Composant pour afficher une carte de projet
// Auteurs : Paul Agudze, Thomas Garneau

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

export function ProjectCard({
  project,
  onClick,
}: {
  project: any;
  onClick: any;
}): React.ReactNode {
  const router = useRouter();

  return (
    <Card className="max-w-[250px] mt-6 ml-6">
      <Link href={`/dashboard/projects/${project.project_id}-${project.id}`}>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-bold text-black">{project.title}</p>
          </div>
        </CardHeader>
      </Link>
      <Divider />
      {project.description ? (
        <CardBody>
          <p>{project.description}</p>
        </CardBody>
      ) : null}
    </Card>
  );
}
