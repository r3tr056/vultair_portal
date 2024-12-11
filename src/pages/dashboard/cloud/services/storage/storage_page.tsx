
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Cloud, ExternalLink, FolderPlus, HardDrive, Search, Upload } from "lucide-react"
import { Link } from "react-router-dom"

export default function StoragePage() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r">
                <ScrollArea className="h-full py-6">
                    <div className="space-y-4">
                        <div className="px-3 py-2">
                            <div className="space-y-1">

                                <nav className="space-y-1">
                                    <Link
                                        to="/storage/browser"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        Browser
                                    </Link>

                                    <Link
                                        to="/storage/projects"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        Projects
                                    </Link>
                                    <Link
                                        to="/storage/settings"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        Settings
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        <Separator />
                        <div className="px-3 py-2">
                            <h2 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">Resources</h2>
                            <nav className="space-y-1">
                                <Link
                                    to="#"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    Documentation <ExternalLink className="ml-auto h-4 w-4" />
                                </Link>
                            </nav>
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Main Content */}
            <div className="flex-1">

                <div className="border-b py-4 px-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">All Stores</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components">pixelface</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>fb-store</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                </div>



                <div className="grid grid-cols-1 gap-4 p-8">
                    <div className="flex items-center">
                        <HardDrive className="h-10 w-10 text-orange-600" />
                        <h1 className="text-3xl font-semibold ml-3">fb-store</h1>
                    </div>
                    {/* Status Section */}
                    <div className="grid gap-4 md:grid-cols-4 my-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <h3 className="text-sm font-medium">Status</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Available</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Storage</h3>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">0 B/250 MB</span>
                                </div>
                                <Progress value={0} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Operations</h3>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">0/100k</span>
                                </div>
                                <Progress value={0} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Data Transfer</h3>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">0 B/5 GB</span>
                                </div>
                                <Progress value={0} />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Browser Section */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">Browser</h2>
                            <p className="text-sm text-muted-foreground">
                                View and manage the blobs in this store.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search the name of a blob, a prefix or a fully quantified URL"
                                className="flex-1"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Cloud className="h-4 w-4" />
                                        <BreadcrumbLink href="/">
                                            fb-store
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/components">pixelface</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>fb-store</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    <FolderPlus className="mr-2 h-4 w-4" />
                                    New folder
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload
                                </Button>
                            </div>
                        </div>
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed">
                            <HardDrive className="h-10 w-10 text-muted-foreground" />
                            <p className="mt-4 text-sm text-muted-foreground">
                                There are no blobs in this store yet
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

