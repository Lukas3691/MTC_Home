import { ImageResponse } from "next/og";

export const alt =
  "Money Tree Leads — pre-qualified real estate leads for Canadian realtors, plans from $179/mo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              backgroundColor: "#6dff52",
            }}
          />
          <div
            style={{
              color: "#f5f5f5",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Money Tree Leads
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              color: "#f5f5f5",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Cold leads are dead.
          </div>
          <div
            style={{
              display: "flex",
              color: "#6dff52",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Get the ones who picked up.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#a3a3a3", fontSize: 28 }}>
            Pre-qualified real estate leads for Canadian realtors
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#6dff52",
              color: "#0a0a0a",
              borderRadius: 9999,
              padding: "12px 28px",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            From $179/mo
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
