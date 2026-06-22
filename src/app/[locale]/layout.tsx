import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Fatih Çakır — Backend Engineer",
  description:
    "Personal portfolio of Fatih Çakır — Backend Engineer specializing in .NET Core, Python, AI/ML and DevOps. Open to new opportunities.",
  keywords: ["Fatih Çakır", "Backend Engineer", "Software Engineer", "Portfolio", ".NET Core", "Python", "AI", "DevOps"],
  authors: [{ name: "Fatih Çakır" }],
  openGraph: {
    title: "Fatih Çakır — Backend Engineer",
    description: "Personal portfolio of Fatih Çakır",
    type: "website",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
