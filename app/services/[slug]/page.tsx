import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import MagneticButton from "@/components/ui/MagneticButton";
import { services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <main className="inner-page service-detail-page">
      <Header />
      <section className="service-detail-hero">
        <Image src={service.image} alt="" fill priority sizes="100vw" className="service-detail-bg" />
        <div className="service-detail-veil" />
        <div className="page-shell service-detail-hero__inner">
          <span className="section-label">{service.eyebrow}</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <MagneticButton href="/contact">Discuss this service</MagneticButton>
        </div>
      </section>
      <section className="page-shell service-detail-body">
        <div className="service-detail-copy">
          {service.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="service-detail-columns">
          <div><span className="section-label">DELIVERABLES</span><ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><span className="section-label">PROCESS</span><ol>{service.process.map((item) => <li key={item}>{item}</li>)}</ol></div>
        </div>
        <Link href="/services" className="text-link">← Back to all services</Link>
      </section>
      <Footer />
    </main>
  );
}
