'use client'
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useGlobalDialogStore } from "@/store/dialog-store";


type GlobalDialogProp = {
    title: string,
    children: ReactNode
}
export default function GlobalDialog({ title, children } : GlobalDialogProp){
    const { open, setOpen } = useGlobalDialogStore()
    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}