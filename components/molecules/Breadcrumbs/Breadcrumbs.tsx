"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment, type FC } from "react";

type BreadcrumbsProps = {};

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const {} = props;
  const pathname = usePathname();

  const segments = pathname.split("/");

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem key="home">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            if (!segment) return null;

            /** Last item */
            if (index === segments.length - 1) {
              return (
                <Fragment key={segment}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  </BreadcrumbItem>
                </Fragment>
              );
            }

            const href = `${segments.slice(0, index + 1).join("/")}`;

            return (
              <Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
