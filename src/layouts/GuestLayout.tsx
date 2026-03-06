import { NavBar } from "@/components/NavBar";
import { House, Mail, KeyRound, LogIn } from "lucide-react";
import { Outlet } from "react-router";

export default function GuestLayout(){
    const pages = [
        {
            name: 'Home',
            url: '/',
            icon: House,
        },
        {
            name: 'Contact Us',
            url: 'contact',
            icon: Mail,
        },
        {
            name: 'Auth',
            url: 'auth',
            icon: KeyRound,
        },
        {
            name: 'Login',
            url: 'dashboard',
            icon: LogIn,
        }
    ]

    return(
        <>
            <NavBar items={pages} />
            <Outlet />
        </>
    )
}