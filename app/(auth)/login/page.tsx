import Login from "@/app/(auth)/login/Login"
import AuthCardheader from "../components/AuthCardHeader";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto !border-zinc-400 max-w-screen-md max-sm:min-w-72 sm:min-w-96">
        <AuthCardheader title="Login" />
        <Login />
      </Card>
    </div>
  )
}
