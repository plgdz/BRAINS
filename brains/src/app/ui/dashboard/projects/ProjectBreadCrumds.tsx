// ProjectBreadCrumds.tsx
// Composant pour afficher les miettes de pain d'un projet
// Auteurs : Paul Agudze, Thomas Garneau

"use client";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import React, { useState, useEffect } from "react";
import { projectMiddleware } from "@/app/lib/actions/projects";

export function ProjectBreadCrumds(props: {
  ids: {
    project_id: string;
    id: string;
  };
}) {
  const [projects, setProjects] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBreadcrumbs = async () => {
      const fetchedBreadcrumbs = await projectMiddleware(
        "getProjectBreadcrumbs",
        props
      );
      // @ts-ignore
      setProjects(fetchedBreadcrumbs);

      let id = Number(props.ids.id);
      // @ts-ignore
      let project = fetchedBreadcrumbs.find(
        (project: any) => project.id === id
      );
      let temp: any[] = [];

      while (true) {
        if (project) {
          if (project.parent === null) {
            temp = [...temp, [project.title, project.id]];
            project = null;
            break;
          }
          temp = [...temp, [project.title, project.id]];
          id = Number(project.parent);
          // @ts-ignore
          project = fetchedBreadcrumbs.find(
            (project: any) => project.id === id
          );
        } else {
          break;
        }
      }
      // @ts-ignore
      setBreadcrumbs(temp.reverse());
    };
    fetchBreadcrumbs();
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [projects]);

  return (
    <Breadcrumbs size={"md"} variant={"solid"} className={"pt-16 md:pt-0"}>
      {breadcrumbs.length > 0 ? (
        breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem
            className={"h-8"}
            key={index}
            href={`/dashboard/projects/${props.ids.project_id}-${breadcrumb[1]}`}
          >
            {breadcrumb[0]}
          </BreadcrumbItem>
        ))
      ) : (
        <BreadcrumbItem className="h-8 w-20 bg-gray-100 rounded animate-pulse">
          {" "}
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
}
