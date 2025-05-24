// src/components/SharePriceChart.tsx
import React from 'react'
import {
  ResponsiveContainer,
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'

interface Point {
  date:     string
  baseline: number
  adjusted: number
  price:    number
}

export default function SharePriceChart({ data }: { data: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
        <Legend verticalAlign="bottom" height={36} />

        {/* Blue “baseline” line */}
        <Line
          type="monotone"
          dataKey="baseline"
          name="eg baseline"
          stroke="#1a365d"
          dot={{ r: 3 }}
        />

        {/* Orange “adjusted” line */}
        <Line
          type="monotone"
          dataKey="adjusted"
          name="eg adjusted"
          stroke="#c9b037"
          dot={{ r: 3 }}
        />

        {/* Green actual share-price line */}
        <Line
          type="monotone"
          dataKey="price"
          name="Actual"
          stroke="#38a169"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
