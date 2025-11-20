// import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { useState } from "react";

export const ShadcnExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-10 py-10">
      <Card
        className="w-[75%] h-[70vh] flex items-center justify-center 
        border-2 border-gray-800 shadow-2xl rounded-2xl"
      >
        <CardContent className="flex items-center justify-center w-full h-full">
          <AlertDialog>
            <AlertDialogTrigger className="bg-amber-400">
              meni bos
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <h1>shunchaki button</h1>
      <Card
        className="w-[75%] h-[70vh] flex items-center justify-center 
        border-2 border-gray-800 shadow-2xl rounded-2xl"
      >
        <CardContent className="flex items-center justify-center w-full h-full">
          <Button className="w-32">Button</Button>
        </CardContent>
      </Card>

      <h1>javon tortmasi</h1>
      <Card
        className="w-[75%] h-[70vh] flex items-center justify-center 
        border-2 border-gray-800 shadow-2xl rounded-2xl"
      >
        <CardContent className="flex flex-col items-center justify-center w-full h-full gap-4">
          <Button className="w-32" onClick={() => setOpen(true)}>
            Open Drawer
          </Button>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="p-5">
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
              </DrawerHeader>
              <p>Drawer ichidagi content shu yerda.</p>
              <Button className="mt-4" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>

      <h1>tanlash</h1>
      <Card
        className="w-[75%] h-[70vh] flex items-center justify-center 
        border-2 border-gray-800 shadow-2xl rounded-2xl"
      >
        <CardContent className="flex items-center justify-center w-full h-full">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card
        className="w-[75%] h-[70vh] flex items-center justify-center 
        border-2 border-gray-800 shadow-2xl rounded-2xl"
      >
        <CardContent className="flex items-center justify-center w-full h-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-lg border md:min-w-[450px]"
          >
            <ResizablePanel defaultSize={50}>
              <div className="flex h-[200px] items-center justify-center p-6">
                <span className="font-semibold">One</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={25}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Two</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Three</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    </div>
  );
};
