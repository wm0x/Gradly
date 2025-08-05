"use client";

import { Command } from "cmdk";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";

type CommandItem = {
  icon: IconType;
  label: string;
  action: () => void;
  deleteAction?: () => void; 
};

type CommandGroup = {
  heading: string;
  items: CommandItem[];
};

type CommandMenuProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
  commandGroups: CommandGroup[];
  onWordSearch: (word: string) => void;
};

export const CommandMenu = ({
  open,
  setOpen,
  placeholder,
  commandGroups,
  onWordSearch,
}: CommandMenuProps) => {
  const [value, setValue] = useState("");

  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  
  const allItems = commandGroups.flatMap((group) => group.items);

  
  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(value.toLowerCase())
  );

  const showEmpty = value.trim() !== "" && filteredItems.length === 0;

  return (
    <div dir="ltr">
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="search command menu"
        className="fixed inset-0 bg-stone-950/50 flex justify-center items-start pt-12 z-50"
        dir="ltr"
      >
        <div
          className="absolute inset-0"
          onClick={() => setOpen(false)}
        />

        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-green-950 rounded-xl shadow-xl border border-green-200 overflow-hidden w-full max-w-lg mx-auto text-white"
          dir="ltr"
        >
          <DialogTitle className="sr-only"> search menu </DialogTitle>

          <Command>
            <Command.Input
              value={value}
              onValueChange={setValue}
              placeholder={placeholder}
              className="relative border-b border-stone-400/30 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none bg-green-950 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter" && showEmpty) {
                  e.preventDefault();
                  onWordSearch(value);
                  setOpen(false);
                  setValue("");
                }
              }}
            />

            <Command.List className="p-3 space-y-2">
              {showEmpty && (
                <div
                  onClick={() => {
                    onWordSearch(value);
                    setOpen(false);
                    setValue("");
                  }}
                  className="cursor-pointer transition-colors p-2 text-sm text-white hover:bg-green-800/30 rounded items-center gap-2"
                >
                  search for "<span className="font-extrabold">{value}</span>"
                </div>
              )}

              {!showEmpty &&
                commandGroups.map((group, index) => (
                  <Command.Group
                    key={index}
                    heading={group.heading}
                    className="text-sm mb-3 text-green-500"
                  >
                    {group.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <Command.Item
                          onSelect={() => {
                            item.action();
                            setOpen(false);
                          }}
                          className="flex cursor-pointer transition-colors p-2 text-sm text-white hover:bg-green-800/30 rounded items-center gap-2 flex-grow"
                        >
                          <item.icon />
                          {item.label}
                        </Command.Item>

                        {item.deleteAction && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); 
                              item.deleteAction && item.deleteAction();
                            }}
                            className="text-red-500 p-1 hover:bg-red-500 hover:text-white rounded"
                            aria-label={`delete ${item.label}`}
                            title={`delete ${item.label}`}
                          >
                            <AiOutlineClose />
                          </button>
                        )}
                      </div>
                    ))}
                  </Command.Group>
                ))}
            </Command.List>
          </Command>
        </div>
      </Command.Dialog>
    </div>
  );
};
