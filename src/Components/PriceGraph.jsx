import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriceGraph = ({ flights }) => {
  const data = flights
    .map((f) => ({
      time: f.departureTime, 
      price: Number(f.price) || 0, 
      airline: f.airlineName,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return dateA - dateB;
      }
      return 0;
    });

  const formatTime = (timeStr) => {
    if (!timeStr) return "";

    if (!timeStr.includes("T") && !timeStr.includes("-")) {
      return timeStr;
    }

    try {
      const date = new Date(timeStr);
      if (isNaN(date.getTime())) return timeStr; 
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return timeStr;
    }
  };

  const formatPrice = (value) => `$${value}`;

  if (data.length === 0) return null;

  return (
    <div className="w-full h-[250px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f3f4f6"
          />

          <XAxis
            dataKey="time"
            tickFormatter={formatTime}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            dataKey="price"
            tickFormatter={formatPrice}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            width={60}
          />

          <Tooltip
            labelFormatter={formatTime}
            formatter={(value) => [`$${value}`, "Price"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceGraph;
