export default function ATSScoreCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          <p className="text-slate-400 text-sm mt-2">
            {subtitle}
          </p>
        </div>

        <div className="bg-blue-100 p-3 rounded-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}