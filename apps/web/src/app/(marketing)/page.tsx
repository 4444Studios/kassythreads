import SignatureHero from "@/components/server/SignatureHero";
import GifProductSection from "@/components/server/GifProductSection";
import FeaturedCarousel from "@/components/server/FeaturedCarousel";
import ServicesGrid from "@/components/server/ServicesGrid";
import ProductsSection from "@/components/server/ProductsSection";
import BeforeAfterSection from "@/components/server/BeforeAfterSection";
import Testimonials from "@/components/server/Testimonials";
import { UGCGallery } from "@/components/client/UGCGallery";
import { getInstagramFeed } from "@/lib/instagram";

export default async function HomePage() {
  const posts = await getInstagramFeed(12);

  return (
    <main>
      <SignatureHero />
      <GifProductSection />
      <FeaturedCarousel />
      <ServicesGrid />
      <ProductsSection />
      <Testimonials />
      <BeforeAfterSection />
      <UGCGallery posts={posts} />
    </main>
  );
}
