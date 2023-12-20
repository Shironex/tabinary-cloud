"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  FileAccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import { HardDrive, Trash2, Share2, Star, Clock2 } from "lucide-react";
import Link from "next/link";
type FolderWithSubFoldersAndFiles = {
  id: string;
  name: string;
  subFolders?: FolderWithSubFoldersAndFiles[];
  files?: { id: string; name: string }[];
};

// Function to generate random string IDs
function generateRandomID() {
  return Math.random().toString(36).substring(2);
}

// Recursive function to generate random folder structure
function generateRandomFolderStructure(depth: number, maxDepth: number) {
  if (depth >= maxDepth) {
    return [];
  }

  const numSubFolders = Math.floor(Math.random() * 3) + 1; // Randomly choose 1-3 subfolders
  const subFolders = [];

  for (let i = 0; i < numSubFolders; i++) {
    const folder: FolderWithSubFoldersAndFiles = {
      id: generateRandomID(),
      name: `Folder ${depth}-${i}`,
      subFolders: generateRandomFolderStructure(depth + 1, maxDepth),
      files: generateRandomFiles(),
    };
    subFolders.push(folder);
  }

  return subFolders;
}

// Function to generate random files
function generateRandomFiles() {
  const numFiles = Math.floor(Math.random() * 5); // Randomly choose up to 5 files
  const files = [];

  for (let i = 0; i < numFiles; i++) {
    const file = {
      id: generateRandomID(),
      name: `File ${i}.txt`,
    };
    files.push(file);
  }

  return files;
}

// Generate a random folder structure
const sampleFolders = [
  {
    id: generateRandomID(),
    name: "Root",
    subFolders: generateRandomFolderStructure(0, 8), // Adjust the depth as needed
  },
];

type MenuItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const StorageSideBar = () => {
  const [selected, SetSelected] = useState(0);

  const renderAccordionItems = (
    nodes: FolderWithSubFoldersAndFiles[],
    className = ""
  ) => {
    return nodes.map((node, index) => (
      <AccordionItem
        key={node.id}
        value={node.id}
        className={cn("border-0 " + className)}
      >
        <FileAccordionTrigger className="whitespace-nowrap">{node.name}</FileAccordionTrigger>
        <AccordionContent>
          {node.subFolders && renderAccordionItems(node.subFolders, "ml-3")}
          {/* {node.files && node.files.map((file) => (
                <AccordionContent className="ml-2 truncate hover:text-clip" key={file.id}>{file.name}</AccordionContent>
              ))} */}
        </AccordionContent>
      </AccordionItem>
    ));
  };
  // <Accordion type="multiple">{renderAccordionItems(folders)}</Accordion>
  const MenuItems: MenuItem[] = [
    {
      label: "My Drive",
      href: "/dashboard/home",
      icon: <HardDrive size={22} className="text-indigo-600" />,
    },
    {
      label: "Recents",
      href: "/dashboard/storage",
      icon: <Clock2 size={22} className="text-slate-600" />,
    },
    {
      label: "Starred",
      href: "/dashboard/schedule",
      icon: <Star size={22} className="text-yellow-500" />,
    },
    {
      label: "Shared",
      href: "/dashboard/favorites",
      icon: <Share2 size={22} className="text-green-600" />,
    },
    {
      label: "Deleted Files",
      href: "/dashboard/trash",
      icon: <Trash2 size={22} className="text-red-600" />,
    },
  ];
  return (
    <aside className="flex h-full w-[250px] flex-shrink-0 flex-col py-3 bg-background border-r-[1px]">
      <ul className="relative px-3">
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link
              className="flex items-center justify-start space-x-4 p-3 rounded-md duration-300 hover:bg-slate-600/10"
              onClick={() => SetSelected(index)}
              href={"#"}
            >
              <span className="pl-1">{item.icon}</span>
              <span
                className={`whitespace-nowrap text-sm duration-300`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
        <div
          className="absolute left-0.5 h-8 border border-l-2 border-primary rounded-full duration-300"
          style={{
            top: selected === 0 ? "8px" : `${8 + 46 * selected}px`,
          }}
        ></div>
      </ul>
      <Separator className="mb-3 mt-2" />

      <Label className="mx-5 text-sm text-foreground dark:text-zinc-400">
        Folders
      </Label>
      <section className="px-5 h-64 w-full overflow-auto">
        <Accordion type="multiple">
          {renderAccordionItems(sampleFolders)}
        </Accordion>
      </section>
    </aside>
  );
};

export default StorageSideBar;
