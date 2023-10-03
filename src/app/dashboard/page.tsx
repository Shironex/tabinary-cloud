import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { File, FileText, ImageIcon, PlaySquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DashboardHomePage = () => {
  return (
    <MaxWidthWrapper className="mt-7">
      <h1 className="text-2xl font-semibold leading-none tracking-tight mb-3">
        Storage usage
      </h1>
      <div className="flex gap-3">
        <FolderCard
          Icon={<ImageIcon className="h-8 w-8 text-primary/50" />}
          title="Images"
          files={3500}
          progress={25}
          storage={25}
        />
        <FolderCard
          Icon={<PlaySquare className="h-8 w-8 text-primary/50" />}
          title="Media"
          files={20}
          progress={25}
          storage={25}
        />
        <FolderCard
          Icon={<FileText className="h-8 w-8 text-primary/50" />}
          title="PDF"
          files={1500}
          progress={5}
          storage={5}
        />
        <FolderCard
          Icon={<File className="h-8 w-8 text-primary/50" />}
          title="Other"
          files={900}
          progress={50}
          storage={50}
        />
      </div>
    </MaxWidthWrapper>
  );
};

type FolderCardProps = {
  Icon: React.ReactElement;
  title: string;
  files: number;
  storage: number;
  progress: number;
};

const FolderCard = ({ Icon, title, files, storage, progress }: FolderCardProps) => {
  return (
    <Card className="w-64 hover:bg-card/70">
      <CardHeader className="">
        <div className="flex items-center justify-center bg-primary/20 w-10 h-10 rounded-md">
          {Icon}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="my-2 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{files} Files</p>
        </div>
        <Progress value={progress} />
      </CardContent>
      <CardFooter className="px-6 pt-0">
        <CardDescription className="ml-auto">{storage} GB</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default DashboardHomePage;
