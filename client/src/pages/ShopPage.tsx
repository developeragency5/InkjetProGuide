import { EcwidStore } from "@/components/EcwidStore";
import { SEOHead } from "@/components/SEOHead";

export default function ShopPage() {
  return (
    <>
      <SEOHead page="products" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <EcwidStore />
      </div>
    </>
  );
}
