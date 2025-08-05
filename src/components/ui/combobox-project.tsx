"use client";

import * as React from "react";
import { MdOutlineEdit } from "react-icons/md";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "./dropdown-menu";

type ComboboxDropdownMenuProps = {
    onDelete: () => void;
  };
  
  export function ComboboxDropdownMenu({ onDelete }: ComboboxDropdownMenuProps) {
    const [open, setOpen] = React.useState(false);
  
    return (
      <div className="flex w-full flex-col items-start justify-between rounded-md px-4 py-3 sm:flex-row sm:items-center">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className="text-white/50 hover:text-white transition-colors"
              aria-label="More options"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
  
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-green-500 flex justify-between hover:bg-gray-200 cursor-pointer"
                disabled
              >
                Edit (soon)
                <MdOutlineEdit />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-green-600/20" />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(false);
                  onDelete();
                }}
                className="text-red-600 hover:bg-red-700 hover:text-white rounded cursor-pointer"
              >
                Delete
                <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  