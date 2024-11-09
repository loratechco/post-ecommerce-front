import { useToast } from "@/hooks/use-toast";

function Toaster() {
    const { toast } = useToast()
    return ( 

        toast({
            description: "Your message has been sent.",
        })

     );
}

export default Toaster;