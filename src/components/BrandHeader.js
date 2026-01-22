import "./BrandHeader.css";

/**
 * BrandHeader
 * Small brand row with logo mark + product name.
 */
export default function BrandHeader({ title = "Smart Survey Panel" }) {
  return (
    <div className="brand-header">
      <div className="brand-header__logo" aria-hidden="true" />
      <h2 className="brand-header__title">{title}</h2>
    </div>
  );
}
