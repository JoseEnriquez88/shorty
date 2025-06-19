"use client";
import Link from "next/link";
import { pillTabs } from "@/utils/pillTabs.utilities";

export default function TranslateButton() {
  return (
    <div className="">
      {pillTabs?.map((tab, index) => (
        <div key={index} className="">
          <Link href={tab.href} className="">
            {tab.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
