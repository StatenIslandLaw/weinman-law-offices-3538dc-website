// Metadata is defined in metadata.ts to avoid duplication
export { metadata } from './metadata';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
