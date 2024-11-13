import Link from "next/link"

function AuthToggle({
    descriptionAuthToggle = "Don&apos;t have an account?",
    href = '#',
    title = "Login",
}) {

    return (
        <div className="mt-4 text-center text-sm">

            {descriptionAuthToggle}{" "}
            <Link
                href={href}
                className="underline">
                {title}
            </Link>

        </div>
    );
}

export default AuthToggle;