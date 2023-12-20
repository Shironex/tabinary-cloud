import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  FolderOpen,
  MoveLeftIcon,
  MoveRightIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const DashboardStorage = () => {
  return (
    <div className="flex-1 overflow-hidden h-full p-10 py-5">
      <section className="flex items-center space-x-4 mt-3">
        <MoveLeftIcon className="w-7 h-7 text-primary cursor-pointer" />
        <MoveRightIcon className="w-7 h-7 text-primary cursor-pointer" />
        <Label className="text-xl text-foreground">Documents</Label>
        <ChevronRight className="w-5 h-5 text-foreground" />
        <Label className="text-xl text-foreground">Images</Label>
        <ChevronRight className="w-5 h-5 text-foreground" />
        <Label className="text-xl text-foreground">Laptops</Label>
      </section>
      <section className="mt-10 flex flex-wrap w-full items-center gap-5 overflow-x-auto">
        {GenerateFolder()}
        {GenerateFiles()}
      </section>
    </div>
  );
};

const GenerateFolder = () => {
  const array = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <>
      {array.map((_, i: number) => (
        <div className="flex flex-col justify-center items-center gap-2 h-32 w-28 cursor-pointer transition-colors hover:bg-primary/20 bg-primary/10 rounded-sm" key={i}>
          <FolderOpen className="w-20 h-20 text-primary" />
          <Label className="text-foreground">Documents</Label>
        </div>
      ))}
    </>
  );
};

const GenerateFiles = () => {
  const array = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <>
      {array.map((_, i: number) => (
        <div className="flex flex-col justify-center items-center gap-2 h-32 w-28 cursor-pointer transition-colors hover:bg-primary/20 bg-primary/10 rounded-sm" key={i}>
          <Image src="/storage.jpg" alt="file image" className="w-20 h-20 rounded-sm" width={80} height={80} />
          {/* <FolderOpen className="w-20 h-20 text-primary" /> */}
          <Label className="text-foreground">Storage.jpg</Label>
        </div>
      ))}
    </>
  );
};

export default DashboardStorage;
