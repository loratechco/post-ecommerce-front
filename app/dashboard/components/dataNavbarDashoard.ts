import React from "react";
import {
    FolderKanban,
    Home,
    LucideProps,
    MessagesSquare,
    Settings2,
    TicketPercent,
    User2,
    Users2,
    Wallet,
} from "lucide-react"

export type navMain = {
    title: string;
    url: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}[];

const dataNavbarDashbord = (BASE_ROUTE: string) => {
    const data = {
        navMain: [
            {
                title: "Home",
                url: BASE_ROUTE,
                icon: Home,
            },
            {
                title: "Wallet",
                url: BASE_ROUTE + "/wallet",
                icon: Wallet,
            },
            {
                title: 'Profile',
                url: BASE_ROUTE + "/profile",
                icon: User2,
            },
            {
                title: 'User Management',
                url: BASE_ROUTE + "/users-management",
                icon: Users2,
            },
            {
                title: 'Tickets',
                url: BASE_ROUTE + "/ticketing",
                icon: MessagesSquare,
            },
            {
                title: 'Groups',
                url: BASE_ROUTE + "/groups",
                icon: FolderKanban,
            },
            {
                title: "Coupons",
                url: BASE_ROUTE + "/coupons",
                icon: TicketPercent,
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
            },
        ],
    };

    return data;
}
export default dataNavbarDashbord;
