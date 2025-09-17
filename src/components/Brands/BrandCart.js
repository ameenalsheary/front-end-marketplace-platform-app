export default function BrandCart(props) {
  const { image, name } = props.brand;

  return (
    <div className="p-2.5 bg-background rounded-lg shadow-md cursor-pointer hover-lift group">
      <img src={image} alt="brand" className="rounded-t-lg w-full mb-2.5" />
      <h1 className="text-text text-center font-medium text-lg capitalize line-clamp-1 group-hover:text-primary">
        {name}
      </h1>
    </div>
  );
}
