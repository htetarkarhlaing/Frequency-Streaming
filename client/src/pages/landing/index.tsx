import { useDisclosure } from "@nextui-org/react";
import Login from "../../components/login"
import Nav from "../../components/nav"
import Register from "../../components/register";

const Landing = () => {

    const loginDisclosure = useDisclosure();
    const registerDisclosure = useDisclosure();

    return (
        <div className="w-screen h-screen">
            <Nav openLogin={loginDisclosure.onOpen} openRegister={registerDisclosure.onOpen} />
            <Login isOpen={loginDisclosure.isOpen} onOpenChange={loginDisclosure.onOpenChange} />
            <Register isOpen={registerDisclosure.isOpen} onOpenChange={registerDisclosure.onOpenChange} />
        </div>
    )
}

export default Landing