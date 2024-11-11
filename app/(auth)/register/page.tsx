import AuthCardheader from "@/components/auth-componetns/AuthCardHeader";
import SignUp from "./SignUp";
import { Card } from "@/components/ui/card"
function SignUpPage() {

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">

            <Card className="mx-auto !border-zinc-400 max-w-screen-md max-sm:min-w-72 sm:min-w-96">
                {/* Form Title */}
                < AuthCardheader
                    title="Sign Up"
                />
                <SignUp />
            </Card>
        </div>
    );
}

export default SignUpPage;