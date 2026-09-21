import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import TiltCard from "@/components/ui/TiltCard";

export default function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <div className="page-shell">
        <div className="section-head services-head">
          <div data-reveal="up">
            <span className="section-label">OUR SERVICES</span>
            <h2>Four pillars. One growth system.</h2>
          </div>
          <div className="section-head__aside" data-reveal="left">
            <p>From strategy to scale, each service works as a standalone capability or as one connected system.</p>
            <Link href="/services" className="text-link">View all services <span>→</span></Link>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug} className="service-link" data-reveal="up">
              <TiltCard className="service-card">
                <Image src={service.image} alt="" fill sizes="(max-width: 800px) 92vw, 25vw" className="service-card__image" />
                <div className="service-card__shade" />
                <div className="service-card__top">
                  <span>{service.index}</span>
                  <span className="service-card__metric">{service.accentMetric}</span>
                </div>
                <div className="service-card__hud" aria-hidden="true">
                  <i/><i/><i/><i/><i/>
                </div>
                <div className="service-card__copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-card__cta">View service <b>→</b></span>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
