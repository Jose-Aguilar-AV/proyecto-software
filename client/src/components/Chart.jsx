import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="valor" stroke="#16a34a" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
