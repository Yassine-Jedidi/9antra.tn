interface CourseCardProps {
  title: string;
  price: string;
  image: string;
}

const CourseCard = ({ title, price, image }: CourseCardProps) => (
  <div className="flex flex-col rounded-lg">
    <img src={image} alt={title} className="w-full h-60 object-cover" />
    <div className="p-4">
      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      <p className="text-[#C1316D] font-bold text-lg mx-4">{price} DT/ Month</p>
    </div>
  </div>
);

export default CourseCard;
