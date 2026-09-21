import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <main className="inner-page">
      <Header />
      <section className="inner-hero page-shell">
        <span className="section-label">SERVICES</span>
        <h1>Four connected capabilities.<br/>One growth system.</h1>
        <p>Each service has its own route and can be expanded independently as the site grows.</p>
      </section>
      <section className="page-shell service-index-grid">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="service-index-item">
            <span>{service.index}</span><h2>{service.title}</h2><p>{service.description}</p><b>Explore →</b>
          </Link>
        ))}
      </section>
      <Footer />
    </main>
  );
}
