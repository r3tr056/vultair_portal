'use client'

import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react'
import { useState } from 'react'

type FileSystemItem = {
    name: string
    type: 'file' | 'folder'
    children?: FileSystemItem[]
}

const initialFileSystem: FileSystemItem[] = [
    {
        name: 'Documents',
        type: 'folder',
        children: [
            { name: 'report.pdf', type: 'file' },
            { name: 'spreadsheet.xlsx', type: 'file' },
        ],
    },
    {
        name: 'Pictures',
        type: 'folder',
        children: [
            { name: 'vacation.jpg', type: 'file' },
            { name: 'family.png', type: 'file' },
        ],
    },
    { name: 'music.mp3', type: 'file' },
    { name: 'video.mp4', type: 'file' },
]
function FileSystemItem({ item, depth = 0 }: { item: FileSystemItem; depth?: number }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => {
        if (item.type === 'folder') {
            setIsOpen(!isOpen)
        }
    }

    return (
        <div>
            <div
                className={cn(
                    "flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 cursor-pointer",
                    depth > 0 && "ml-4"
                )}
                onClick={toggleOpen}
            >
                {item.type === 'folder' && (
                    isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
                {item.type === 'folder' ? (
                    <Folder className="h-4 w-4 text-green-500" />
                ) : (
                    <File className="h-4 w-4 text-gray-500" />
                )}
                <span>{item.name}</span>
            </div>
            {item.type === 'folder' && isOpen && item.children && (
                <div className="ml-4">
                    {item.children.map((child, index) => (
                        <FileSystemItem key={index} item={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}

export function FileExplorer() {


    return (
        <div className="border-t transition-all duration-300 ease-in-out p-4">
            <h3 className="text-xl font-semibold">File Explorer</h3>
            <div className="pt-4 overflow-auto h-full]">
                {initialFileSystem.map((item, index) => (
                    <FileSystemItem key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

