// Metadata is defined in metadata.ts to avoid duplication
export { metadata } from './metadata';

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
