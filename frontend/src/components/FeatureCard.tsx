type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

      <div className="text-5xl">
        {icon}
      </div>

      <h2 className="text-2xl font-bold mt-4">
        {title}
      </h2>

      <p className="text-gray-600 mt-3">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;