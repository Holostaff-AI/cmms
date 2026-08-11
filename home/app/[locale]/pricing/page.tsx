import { Metadata } from "next";
import Pricing from "src/content/pricing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/src/components/Footer";
import { getLocalizedMetadata } from "src/utils/metadata";
import { HolostaffStageMark } from '../../holostaff-stage-mark'

const ldJson = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Atlas CMMS",
  description:
    "Flexible pricing plans for Atlas CMMS. Choose between Cloud and Self-Hosted versions of our open-source CMMS to optimize your maintenance operations.",
  url: "https://atlas-cmms.com/pricing",
  image: "https://atlas-cmms.com/static/images/logo/logo.png",
  offers: [
    {
      "@type": "Offer",
      name: "Basic",
      price: "0",
      priceCurrency: "USD",
      description: "For small teams getting started with maintenance management.",
    },
    {
      "@type": "Offer",
      name: "Starter",
      price: "10",
      priceCurrency: "USD",
      description: "For growing teams that need more advanced features.",
    },
    {
      "@type": "Offer",
      name: "Professional",
      price: "15",
      priceCurrency: "USD",
      description: "For established teams that require more customization and support.",
    },
    {
      "@type": "Offer",
      name: "Business",
      price: "40",
      priceCurrency: "USD",
      description: "For large organizations with complex needs and integrations.",
    },
  ],
  publisher: {
    "@type": "Organization",
    name: "Atlas CMMS",
  },
};
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return {
    title: t("pricing_1.title"),
    description: t("pricing_1.description"),
    alternates: getLocalizedMetadata(locale, "/pricing"),
  };
}

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      <Pricing />
      <Footer />
    </>
  );
}

// ── Holostaff instrumentation ──────────────────────────────────
// Added by the Holostaff deploy agent (Atlas CMMS · deploy v1).
// Marks the visitor entering the "mutual commit" journey stage when
// this entry page mounts — powers stage-aware copilot monitoring.
// Safe to relocate; keep one call per entry page. https://docs.holostaff.ai
export default function HolostaffPage(props: any) {
  return (
    <>
      <HolostaffStageMark stage="mutual_commit" /> {/* entry page for "Sign Up" */}
      <Page {...props} />
    </>
  )
}
