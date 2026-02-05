"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapPoint = {
  label: string;
  latitude: number;
  longitude: number;
};

type DynamicMapProps = {
  title?: string;
  points: MapPoint[];
};

export function DynamicMap({ title, points }: DynamicMapProps) {
  const center = points[0]
    ? [points[0].latitude, points[0].longitude]
    : [0, 0];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      {title ? <p className="mb-2 text-sm text-zinc-200">{title}</p> : null}
      <div className="h-64 w-full overflow-hidden rounded-xl">
        <MapContainer center={center} zoom={points.length ? 3 : 1} className="h-full w-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.map((point) => (
            <Marker
              key={`${point.label}-${point.latitude}-${point.longitude}`}
              position={[point.latitude, point.longitude]}
            >
              <Popup>{point.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
