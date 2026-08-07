import { ExternalLink } from "lucide-react"

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.4307050495113!2d-0.07227142411697524!3d5.6506614326887075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf8104e146845f%3A0xa46bd5352553f4be!2sSkyBox%20Event%20Centre%20Gh!5e0!3m2!1sen!2sus!4v1786134886107!5m2!1sen!2sus"

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=5.6506614326887075,-0.07227142411697524"

export function VenueMap() {
  return (
    <div className="mb-12 md:mb-16">
      <div className="rounded-card overflow-hidden aspect-[4/3]">
        <iframe
          src={MAPS_EMBED_SRC}
          title="Map showing Skybox Event Centre, Lashibi, Accra"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-1">
        <p className="font-sans text-xs text-taupe">
          Skybox Event Centre · Lashibi, Accra, Ghana
        </p>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions to Skybox Event Centre on Google Maps"
          className="inline-flex items-center gap-1.5 font-sans text-xs text-rose hover:text-rose-dark transition-colors duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
        >
          Get directions
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
