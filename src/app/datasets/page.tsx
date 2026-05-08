import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datasets" };

const datasets = [
  {
    name: "Beyond Borders Crop Yield v1.0",
    description:
      "246-feature dataset for pan-African crop yield prediction. 1,109 districts, 33 countries, 1981-2022.",
    meta: "22,565 obs · HDF5 + CSV · CC BY 4.0",
    project: "African Crop Yield",
  },
  {
    name: "African District Graph",
    description:
      "Dual-edge graph: geographic proximity + climate similarity. 1,109 nodes, 12,736 edges.",
    meta: "PyTorch Geometric · MIT",
    project: "African Crop Yield",
  },
  {
    name: "GEE Extraction Pipeline",
    description:
      "Google Earth Engine scripts for CHIRPS, ERA5-Land, MODIS, SRTM, and SoilGrids extraction across Africa.",
    meta: "5 scripts · JavaScript · MIT",
    project: "African Crop Yield",
  },
  {
    name: "RSI-Togo-Fiscal-Synthetic v2.0",
    description:
      "Synthetic fiscal compliance benchmark: 2,000 enterprises, 8 regulatory rules grounded in real OTR (Togolese tax authority) rules 2022-2025.",
    meta: "2,000 entities · CSV · MIT",
    project: "Rule-State Inference",
  },
];

export default function DatasetsPage() {
  return (
    <div className="mx-auto max-w-[740px] px-6 py-14 sm:py-20">
      <h1 className="font-serif text-[32px] tracking-tight text-text sm:text-[40px]">
        Datasets
      </h1>
      <p className="mt-3 text-[17px] text-text-secondary">
        Open datasets and benchmarks from our research projects.
      </p>

      <div className="mt-12 divide-y divide-border">
        {datasets.map((d) => (
          <div key={d.name} className="py-7 first:pt-0">
            <h2 className="font-serif text-[20px] text-text">{d.name}</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">
              {d.description}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="font-mono text-[11px] text-text-caption">
                {d.meta}
              </span>
              <span className="text-[11px] text-text-caption">&middot;</span>
              <span className="text-[11px] text-text-caption">{d.project}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
