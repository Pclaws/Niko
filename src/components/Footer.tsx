import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: "Featured",
      links: [
        { name: "Air Force 1", href: "/featured/air-force-1" },
        { name: "Huarache", href: "/featured/huarache" },
        { name: "Air Max 90", href: "/featured/air-max-90" },
        { name: "Air Max 95", href: "/featured/air-max-95" },
      ],
    },
    {
      title: "Shoes",
      links: [
        { name: "All Shoes", href: "/shoes" },
        { name: "Custom Shoes", href: "/shoes/custom" },
        { name: "Jordan Shoes", href: "/shoes/jordan" },
        { name: "Running Shoes", href: "/shoes/running" },
      ],
    },
    {
      title: "Clothing",
      links: [
        { name: "All Clothing", href: "/clothing" },
        { name: "Modest Wear", href: "/clothing/modest" },
        { name: "Hoodies & Pullovers", href: "/clothing/hoodies" },
        { name: "Shirts & Tops", href: "/clothing/shirts" },
      ],
    },
    {
      title: "Kids'",
      links: [
        { name: "Infant & Toddler Shoes", href: "/kids/infant-toddler" },
        { name: "Kids' Shoes", href: "/kids/shoes" },
        { name: "Kids' Jordan Shoes", href: "/kids/jordan" },
        { name: "Kids' Basketball Shoes", href: "/kids/basketball" },
      ],
    },
  ];

  const socialLinks = [
    { name: "X", href: "https://x.com/nike", icon: "/x.svg" },
    { name: "Facebook", href: "https://facebook.com/nike", icon: "/facebook.svg" },
    { name: "Instagram", href: "https://instagram.com/nike", icon: "/instagram.svg" },
  ];

  return (
    <footer className="bg-dark-900 text-light-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.svg"
                alt="Nike"
                width={60}
                height={22}
                className="brightness-0 invert"
              />
            </Link>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-base font-medium text-light-100 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-dark-500 hover:text-light-100 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-light-100 hover:text-dark-500 transition-colors"
                aria-label={social.name}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-light-100 hover:border-dark-500 transition-colors">
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={16}
                    height={16}
                    className="brightness-0 invert"
                  />
                </div>
              </Link>
            ))}
          </div>

          <p className="text-sm font-medium text-dark-500">
            © {new Date().getFullYear()} Nike, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
