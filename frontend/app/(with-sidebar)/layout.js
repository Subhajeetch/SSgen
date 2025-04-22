// when you add a file with first bracket " eg: (with-sidebar)", it will be treated as a folder and it'll not harm your url(endpoints). you can use that feature to make a diffrent layout for a specific pages. on my case, i have a sidebar that i didn't wanted on the main layout. so i created a folder with first bracket and added a layout.js file in it. this will be treated as a folder and not a file. so the url will not be affected. but the layout will be used for all the pages inside this folder. you can also add a page.js file inside this folder to create a new page with the same layout. 

import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import Bc from "./bc.js";

export default function WithSidebarLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-semibold">
                                        <Bc />
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="flex-1 p-4 pt-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
