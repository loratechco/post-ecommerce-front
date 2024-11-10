import AuthBtn from "@/components/auth-componetns/AuthBtn";

function AuthBtnList({ isSubmitting }:{ isSubmitting: boolean  }) {
    return ( 
        <div className="space-y-3 mt-3">
            <AuthBtn
                nameBtn="Login"
                variant="default"
                className="!bg-black dark:bg-gray-200 hover:!bg-zinc-900"
                type="submit"
                disabled={isSubmitting}
            />

            <AuthBtn
                nameBtn="Login with Google"
                className="!border-zinc-400"
                disabled={isSubmitting}
                variant="outline"
                type="button"
            />
        </div>
     );
}

export default AuthBtnList;