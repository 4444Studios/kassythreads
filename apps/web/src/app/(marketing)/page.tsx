import VideoHero from "@/components/server/VideoHero";
import GifProductSection from "@/components/server/GifProductSection";
import ServicesGrid from "@/components/server/ServicesGrid";
import BeforeAfterSection from "@/components/server/BeforeAfterSection";
import Testimonials from "@/components/server/Testimonials";
import { UGCGallery } from "@/components/client/UGCGallery";
import { getInstagramFeed } from "@/lib/instagram";

export default async function HomePage() {
  // Fetch the social wall data here (RSC) and pass it down as props so it stays
  // in the static render rather than a client-side waterfall.
  const posts = await getInstagramFeed(12);

  return (
    <main>
      <VideoHero />
      <GifProductSection />
      <ServicesGrid />
      <BeforeAfterSection />
      <Testimonials />
      <UGCGallery posts={posts} />
    </main>
  );
}
