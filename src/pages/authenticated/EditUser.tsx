import { useParams } from "react-router"

export function EditUser(){
    const params = useParams();
    return(
        <>
            This page is for editing users, user id:{params.id}
        </>
    )
}