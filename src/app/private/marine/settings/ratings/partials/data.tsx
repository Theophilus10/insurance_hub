import format from "date-fns/format";

export const data = [
  {
    id: 1,
    coverType: "ICC(A)",
    interest: "Machinery & Spares Parts, construction equipment, generators, Farm Machinery",
    containerized:'0.2%',
    nonContainerized: '2.25%',
    exclusions: 'Loss of weight, contamination, leakages, and deterioration',
    remarks: 'Institute bulk oil clause',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 2,
    coverType: "ICC(A)",
    interest: "Machinery & Spares Parts, construction equipment, generators, Farm Machinery",
    containerized:'0.3%',
    nonContainerized: '0.4%',
    exclusions: 'Rust, oxidation, electrical mechanical derangement, scratching and denting',
    remarks: 'Institute replacement clause',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 1,
    coverType: "ICC(A)",
    interest: "Machinery & Spares Parts, construction equipment, generators, Farm Machinery",
    containerized:'0.2%',
    nonContainerized: '2.25%',
    exclusions: 'Loss of weight, contamination, leakages, and deterioration',
    remarks: 'Institute bulk oil clause',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 1,
    coverType: "ICC(A)",
    interest: "Machinery & Spares Parts, construction equipment, generators, Farm Machinery",
    containerized:'0.2%',
    nonContainerized: '2.25%',
    exclusions: 'Loss of weight, contamination, leakages, and deterioration',
    remarks: 'Institute bulk oil clause',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
];
