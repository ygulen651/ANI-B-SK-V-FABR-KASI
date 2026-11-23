import { geoArea, geoCentroid, geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry, MultiPolygon, Polygon } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { exportContent } from "@/data/site";

type Props = { name: string };

const W = 960;
const H = 470;
/** Başlangıçta Karaman'a yakınlaşma oranı */
const ZOOM = 7;

/** Çok parçalı ülkelerde (ör. ABD, Fransa, Rusya) ok, en büyük kara parçasının merkezine gitsin */
function mainCentroid(f: Feature<Geometry, Props>): [number, number] {
  const g = f.geometry;
  if (g.type === "MultiPolygon") {
    let best: Polygon | null = null;
    let bestArea = -1;
    for (const coords of (g as MultiPolygon).coordinates) {
      const poly: Polygon = { type: "Polygon", coordinates: coords };
      const a = geoArea(poly);
      if (a > bestArea) {
        bestArea = a;
        best = poly;
      }
    }
    return geoCentroid(best!) as [number, number];
  }
  return geoCentroid(f) as [number, number];
}

function build() {
  const topo = world as unknown as Topology<{ countries: GeometryCollection<Props> }>;
  const fc = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, Props>;
  const features = fc.features.filter((f) => f.properties.name !== "Antarctica");
  const projection = geoEqualEarth().fitExtent(
    [
      [6, 6],
      [W - 6, H - 6],
    ],
    { type: "FeatureCollection", features } as FeatureCollection,
  );
  const path = geoPath(projection).digits(1);
  const listed = new Map(exportContent.countries.map(([tr, en]) => [en, tr]));
  const k = projection([33.22, 37.18]) ?? [0, 0]; // Karaman

  const shapes = features.map((f) => ({ name: f.properties.name, tr: listed.get(f.properties.name), d: path(f) ?? "" }));

  type Target = { key: string; tr: string; x: number; y: number; shape?: string; small?: boolean };
  const targets: Target[] = [];
  for (const f of features) {
    const tr = listed.get(f.properties.name);
    if (!tr) continue;
    const p = projection(mainCentroid(f)) ?? [0, 0];
    targets.push({ key: f.properties.name, tr, x: p[0], y: p[1], shape: path(f) ?? "" });
  }
  for (const [en, ll] of Object.entries(exportContent.smallCountryPoints)) {
    const p = projection(ll) ?? [0, 0];
    targets.push({ key: en, tr: listed.get(en) ?? en, x: p[0], y: p[1], small: true });
  }
  // Yakından uzağa sırala: oklar Karaman'dan dışa doğru dalga gibi yayılsın
  targets.sort((a, b) => Math.hypot(a.x - k[0], a.y - k[1]) - Math.hypot(b.x - k[0], b.y - k[1]));

  const arrows = targets.map((t, i) => {
    const dx = t.x - k[0];
    const dy = t.y - k[1];
    const dist = Math.hypot(dx, dy) || 1;
    // Kavis: orta noktadan dik yönde, mesafeyle orantılı ve hep yukarı doğru
    const bend = Math.min(90, dist * 0.32);
    let nx = -dy / dist;
    let ny = dx / dist;
    if (ny > 0) {
      nx = -nx;
      ny = -ny;
    }
    const cx = k[0] + dx / 2 + nx * bend;
    const cy = k[1] + dy / 2 + ny * bend;
    // Uç teğeti (kontrol noktası → hedef) ok başının açısını verir
    const angle = (Math.atan2(t.y - cy, t.x - cx) * 180) / Math.PI;
    const delay = 3100 + i * 28; // yakınlaşmadan sonra başlar
    return { ...t, d: `M${k[0].toFixed(1)} ${k[1].toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${t.x.toFixed(1)} ${t.y.toFixed(1)}`, angle, delay };
  });

  return { shapes, arrows, karaman: k };
}

let cache: ReturnType<typeof build> | null = null;

export function ExportMap({ className = "" }: { className?: string }) {
  cache ??= build();
  const { shapes, arrows, karaman } = cache;
  const count = exportContent.countries.length;
  const zx = W / 2 - karaman[0] * ZOOM;
  const zy = H / 2 - karaman[1] * ZOOM;

  return (
    <figure className={`light-up export-map ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-hidden rounded-[24px]" role="img" aria-labelledby="ihracat-harita-baslik">
        <title id="ihracat-harita-baslik">{`Karaman'dan kaynak sitede listelenen ${count} ihracat ülkesine uzanan oklarla dünya haritası`}</title>
        <g className="map-zoom" style={{ ["--zx" as string]: `${zx}px`, ["--zy" as string]: `${zy}px`, ["--zs" as string]: ZOOM }}>
          {/* Taban harita */}
          <g>
            {shapes.map((s) => (
              <path key={s.name} d={s.d} fill={s.name === "Turkey" ? "var(--ani-red-700)" : "#f3dfe0"} stroke="#fff" strokeWidth={0.6} vectorEffect="non-scaling-stroke">
                {s.name === "Turkey" && <title>Türkiye – Karaman (merkez ve fabrika)</title>}
              </path>
            ))}
          </g>
          {/* Ok ulaşınca kırmızıya yanan ülkeler */}
          <g>
            {arrows
              .filter((a) => !a.small)
              .map((a) => (
                <path key={a.key} className="lit" d={a.shape} fill="var(--ani-red)" stroke="#fff" strokeWidth={0.6} vectorEffect="non-scaling-stroke" style={{ ["--d" as string]: `${a.delay + 650}ms` }}>
                  <title>{a.tr}</title>
                </path>
              ))}
          </g>
          {/* Karaman'dan çıkan oklar */}
          <g fill="none" stroke="var(--ani-red-900)">
            {arrows.map((a) => (
              <path
                key={a.key}
                className="map-arrow"
                d={a.d}
                pathLength={1}
                strokeWidth={1.1}
                style={{ ["--d" as string]: `${a.delay}ms` }}
              />
            ))}
          </g>
          <g fill="var(--ani-red-900)">
            {arrows.map((a) => (
              <g key={a.key} transform={`translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${a.angle.toFixed(1)})`}>
                <path className="lit" d="M1.5 0 L-5 -3 L-3.6 0 L-5 3 Z" style={{ ["--d" as string]: `${a.delay + 600}ms` }} />
              </g>
            ))}
          </g>
          {arrows
            .filter((a) => a.small)
            .map((a) => (
              <circle key={a.key} className="lit" cx={a.x} cy={a.y} r={3.6} fill="var(--ani-red)" stroke="#fff" strokeWidth={1.2} style={{ ["--d" as string]: `${a.delay + 650}ms` }}>
                <title>{a.tr}</title>
              </circle>
            ))}
          {/* Karaman işareti */}
          <g transform={`translate(${karaman[0]} ${karaman[1]})`}>
            <circle r={7} className="pulse-ring" fill="none" stroke="var(--ani-red)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
            <circle r={7} className="pulse-ring" style={{ animationDelay: "1.1s" }} fill="none" stroke="var(--ani-red)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
            <circle r={4} fill="var(--c-gofret)" stroke="var(--choco-900)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          </g>
        </g>
        {/* Yakınlaşmadayken görünen etiket (haritayla küçülmez, sonra kaybolur) */}
        <g className="map-label" aria-hidden>
          <rect x={W / 2 + 44} y={H / 2 - 78} rx={14} width={224} height={42} fill="var(--ani-red-600)" />
          <text x={W / 2 + 156} y={H / 2 - 51} textAnchor="middle" fontFamily="var(--font-bricolage)" fontWeight={800} fontSize={19} fill="#fff">
            Karaman&apos;dan dünyaya
          </text>
        </g>
      </svg>
      <figcaption className="sr-only">{exportContent.countriesNote}</figcaption>
    </figure>
  );
}
