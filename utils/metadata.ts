import { Metadata } from "next";

interface MetadataProps {
    title?: string;
    description?: string;
    icons?: Array<{ rel: string; url: string; media?: string }>;
    noIndex?: boolean;
    keywords?: string[];
    author?: string;
    twitterHandle?: string;
    type?: "website" | "article" | "profile";
    locale?: string;
    alternates?: Record<string, string>;
    publishedTime?: string;
    modifiedTime?: string;
    email?: string;
    telephone?: string;
  }
  

export const generateMetadata = ({
    title = `HOLOIPTV | Premium IPTV Services with HD Quality`,
    description = `HOLOIPTV offers premium IPTV services with a wide range of channels, on-demand content subscription plans. Stream anytime, anywhere, with HD quality.`,
    icons = [
      {
        rel: "icon",
        url: "/iptv-service.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        url: "/iptv-service.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    noIndex = false,
    keywords = [/*...*/],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
    twitterHandle,
    type = "website",
    locale = "en_US",
    alternates,
    publishedTime,
    modifiedTime,
    email,
    telephone,
  }: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(
      process.env.NEXT_PUBLIC_APP_URL || "https://mntdigital.com/home"
    );
  
    return {
      metadataBase,
      title: {
        default: title,
        template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
      },
      description,
      keywords,
      authors: [{ name: author, url: `mailto:${email}` }],
      creator: author,
      publisher: process.env.NEXT_PUBLIC_APP_NAME,
      formatDetection: {
        email: true,
        address: false,
        telephone: true,
      },
      icons,
      robots: noIndex ? { index: false, follow: false } : undefined,
      openGraph: {
        title,
        description,
        type,
        locale,
        url: metadataBase.href,
        siteName: process.env.NEXT_PUBLIC_APP_NAME,
        ...(publishedTime && { publishedTime }),
        ...(modifiedTime && { modifiedTime }),
        ...(email && { emails: [email] }), // optional OG field
      },
      twitter: {
        card: "summary_large_image",
        creator: twitterHandle || undefined,
        title,
        description,
      },
      ...(alternates && {
        alternates: {
          canonical: alternates["canonical"],
          languages: alternates,
        },
      }),
      other: {
        ...(email && { "contact:email": email }),
        ...(telephone && { "contact:phone_number": telephone }),
      },
    };
  };
  