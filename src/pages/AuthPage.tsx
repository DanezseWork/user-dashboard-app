import { Button } from "@/components/ui/button";


interface AuthPageProps {
    isAuthenticated: boolean;
    onClick: ()=> void;
}

export default function AuthPage({isAuthenticated, onClick}: AuthPageProps){

    return(
        <>
            Gain access to more pages by authenticating yourself.
            <Button onClick={onClick}>{isAuthenticated ? '' : 'Not '}Authenticated</Button>
        </>
    )
}