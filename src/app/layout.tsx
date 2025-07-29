import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import localFont from "next/font/local";

const rustico = localFont({
  src: "../assets/fonts/Rustico-Regular.otf",
  variable: "--font-rustico",
});

const poppins = localFont({
  src: [
    {
      path: "../assets/fonts/poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/poppins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/poppins/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Probono Uganda",
  description: `Pro Bono is a youth-led non-profit organization aimed at impacting
        society positively by establishing outreach programs aimed at
        various sections of society and integrating the communities to meet
        their unique needs.`,
  openGraph: {
    title: "Probono Uganda",
    description: `Pro Bono is a youth-led non-profit organization aimed at impacting
        society positively by establishing outreach programs aimed at
        various sections of society and integrating the communities to meet
        their unique needs.`,
    url: "http://www.itsprobono.org",
    siteName: "Probono Uganda",
    images: [
      {
        url: "http://www.moodbound.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Probono Uganda",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Probono Uganda",
    description: `Pro Bono is a youth-led non-profit organization aimed at impacting
        society positively by establishing outreach programs aimed at
        various sections of society and integrating the communities to meet
        their unique needs.`,
    images: ["http://www.moodbound.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Pro Bono</title>
        <meta
          name="description"
          content="Pro Bono is a youth-led non-profit organization aimed at impacting
        society positively by establishing outreach programs aimed at
        various sections of society and integrating the communities to meet
        their unique needs."
        />
        <meta property="og:title" content="Pro Bono" />
        <meta
          property="og:description"
          content="Pro Bono is a youth-led non-profit organization aimed at impacting
        society positively by establishing outreach programs aimed at
        various sections of society and integrating the communities to meet
        their unique needs."
        />
        <meta
          property="og:image"
          content="https://fancy-heliotrope-b3fc2e.netlify.app/images/8.webp"
        />
        <meta
          name="keywords"
          content="youth-led non-profit Uganda, social impact initiatives Africa, community outreach programs Uganda, sustainable development Uganda, women empowerment Uganda, gender equality initiatives, slum youth rehabilitation, environmental conservation Uganda, climate change action Africa, holistic education underprivileged communities, nonprofit transparency practices, collaborative tech strategy NGOs, Pro Bono Health initiatives, Pro Bono Femmes empowerment, Pro Bono Environment conservation, Pro Bono Educators programs, Uganda youth empowerment, underprivileged community support, sustainable skills development Africa, nonprofit trust-building strategies, Uganda social projects, fighting gender discrimination Uganda, tree planting initiatives Africa, recycling programs Uganda, food drive projects Mukonde, youth-led climate action, empowering women in slums, health equity underprivileged societies, nonprofit partnerships Uganda, authentic community engagement, nonprofit fundraising, volunteer opportunities Uganda, charitable donations Africa, public health campaigns, medical outreach Uganda, healthcare access rural communities, feminist initiatives Africa, gender equity programs, women leadership training, climate resilience projects, eco-friendly solutions Uganda, renewable energy Africa, waste management initiatives, gender-based violence prevention, women economic empowerment, clean water access Uganda, mental health advocacy, sustainable agriculture Africa, grassroots NGOs Uganda, social justice Africa, community mobilization, youth mentorship programs, advocacy for marginalized groups, environmental education workshops, sustainable livelihoods, gender inclusivity training, disaster relief Uganda, poverty alleviation initiatives, human rights advocacy, biodiversity conservation, green energy adoption, menstrual health awareness, digital literacy programs, climate adaptation strategies, African grassroots movements, nonprofit capacity building, gender-responsive policies, sustainable urban development, rural healthcare Uganda, women entrepreneurship support, eco-tourism initiatives, social entrepreneurship Africa, gender parity campaigns, clean energy access, youth activism Africa, nonprofit sustainability models, community-led development, inclusive governance, environmental advocacy Uganda, health education workshops, gender-sensitive programming, renewable resource management, equitable education access, climate justice Africa, education for all Uganda, vocational training programs, STEM education Africa, early childhood development, adult literacy initiatives, girls' education advocacy, school infrastructure projects, teacher training workshops, scholarships for underprivileged youth, education equity programs, community learning centers, educational material donations, school supplies drives, youth education empowerment, lifelong learning opportunities, academic support programs, slum education projects, inclusive classrooms Uganda, UN SDG 4 quality education, global education partnerships, after-school programs, parental education workshops, education technology Africa, critical thinking curricula, creative learning methods, education policy reform, bridging the education gap, rural education access, education sustainability Uganda, cross-disciplinary learning, environmental education curriculum, health education in schools"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Probono" />
        <link rel="manifest" href="/icons/site.webmanifest" />
      </head>
      <body className={`${rustico.variable} ${poppins.variable} antialiased`}>
        <div className="overflow-hidden min-h-screen flex flex-col">
          <Header />
          {children}
          <div className="flex-1"></div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
