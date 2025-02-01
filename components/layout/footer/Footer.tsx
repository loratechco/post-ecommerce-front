import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Our Services",
    links: [
      { href: "#", text: "Track Packages" },
      { href: "#", text: "Express Shipping" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { href: "https://instagram.com", text: "Instagram" },
      { href: "https://telegram.org", text: "Telegram" },
    ],
  },
  {
    title: "Terms & Policies",
    links: [
      { href: "#", text: "Privacy Policy" },
      { href: "#", text: "Terms & Conditions" },
    ],
  },
];

const socialLinks = [
  {
    href: "#",
    iconPath: "/pic/facebook.svg",
    label: "facebook community",
  },
  {
    href: "#",
    iconPath: "/pic/twitter-black-shape.svg",
    label: "Twitter page",
  },
  {
    href: "#",
    iconPath: "/pic/instagram.svg",
    label: "instagram account",
  },
  {
    href: "#",
    iconPath:
      "/pic/linked-in-logo-of-two-letters.svg",
    label: "linked account",
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-zinc-300 mt-12">
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="flex flex-col-reverse md:flex-row-reverse justify-between gap-10 pb-5">
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-7 max-md:text-center">
            {footerLinks.map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href}>
                        <Button
                          variant={"link"}
                          className="text-white hover:text-white p-0 text-base"
                        >
                          {link.text}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-start  max-md:justify-center max-md:w-full gap-7 mt-8 flex-col max-md:pb-3">
            <p className="text-4xl text-center">Logo</p>

            <div className="flex items-center justify-start max-md:justify-center max-md:w-full gap-3">
              {socialLinks.map((social, idx) => (
                <Link key={idx} href={social.href}>
                  <div className="bg-white/20 rounded-full p-2 centerize-flex">
                    <Image
                      src={social.iconPath}
                      alt={social.label}
                      loading="lazy"
                      width={19}
                      height={19}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="md:border-t border-zinc-300 pt-5 space-y-5 text-xs md:text-base text-white">
          <p>
            ESITE SRL | VAT number IT02227730229 | SHARE CAPITAL €100,000
            Trentino
          </p>

          <p>
            ESITE SRL is a company subject to management and coordination by
            Triboo S.p.a.
          </p>
        </div>
      </div>
    </footer>
  );
}
