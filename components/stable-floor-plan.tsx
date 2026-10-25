export function StableFloorPlan() {
  return (
    <figure className="inn-plan">
      <div className="inn-plan-heading">
        <span>THE BARE BONES</span>
        <strong>Overhead view</strong>
      </div>
      <svg
        viewBox="0 0 480 480"
        role="img"
        aria-labelledby="stable-plan-title stable-plan-description"
      >
        <title id="stable-plan-title">
          A simple Stable inside a 20 by 20 footprint
        </title>
        <desc id="stable-plan-description">
          An open paddock with two saddled, tamed adult horses, each led to a
          shared fence post. Two hay bales, a water-filled cauldron, a tack
          barrel and an entrance sign are inside the boundary. Each square is
          one block. Maximum height is also 20 blocks. The surrounding fence and
          floor are optional.
        </desc>
        <defs>
          <pattern
            id="stable-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0H0V20"
              fill="none"
              stroke="#b9c2a4"
              strokeWidth=".7"
            />
          </pattern>
          <pattern
            id="stable-floor"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="20" height="20" fill="#c3a16b" />
            <path
              d="M0 7H20M0 14H20M8 0V7M14 7V14M5 14V20"
              stroke="#9b794d"
              strokeWidth=".8"
            />
          </pattern>
        </defs>
        <rect x="40" y="40" width="400" height="400" fill="#dfe4cf" />
        <rect x="40" y="40" width="400" height="400" fill="url(#stable-grid)" />
        <rect
          x="40"
          y="40"
          width="400"
          height="400"
          fill="none"
          stroke="#667c46"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <path d="M40 29V20H440V29" fill="none" stroke="#667c46" />
        <text x="240" y="14" textAnchor="middle" className="inn-plan-dimension">
          20 BLOCKS MAX
        </text>
        <rect
          x="110"
          y="110"
          width="260"
          height="260"
          fill="url(#stable-floor)"
        />
        <path
          d="M220 370H110V110H370V370H260"
          fill="none"
          stroke="#735434"
          strokeWidth="5"
        />
        {Array.from({ length: 14 }, (_, i) => 110 + i * 20).map((n) => (
          <g key={n} fill="#aa7b46" stroke="#65492d">
            <rect x={n - 4} y="106" width="8" height="8" />
            <rect x="106" y={n - 4} width="8" height="8" />
            <rect x="366" y={n - 4} width="8" height="8" />
            {(n < 220 || n > 260) && (
              <rect x={n - 4} y="366" width="8" height="8" />
            )}
          </g>
        ))}
        {[140, 160].map((x) => (
          <g key={x}>
            <rect
              x={x + 1}
              y="141"
              width="18"
              height="18"
              fill="#d5b34f"
              stroke="#947334"
            />
            <path d={`M${x + 4} 143v14m4-14v14m4-14v14`} stroke="#f0d680" />
            <path
              d={`M${x + 1} 146h18m-18 8h18`}
              stroke="#926042"
              strokeWidth="2"
            />
          </g>
        ))}
        <g>
          <rect
            x="321"
            y="141"
            width="18"
            height="18"
            fill="#747b73"
            stroke="#394339"
            strokeWidth="2"
          />
          <rect x="324" y="144" width="12" height="12" fill="#558baf" />
          <path d="M325 147h8" stroke="#a8d6df" />
        </g>
        <g>
          <rect
            x="321"
            y="321"
            width="18"
            height="18"
            fill="#aa7538"
            stroke="#5f4325"
          />
          <path d="M325 322v16m5-16v16m5-16v16" stroke="#72502c" />
          <path d="M322 325h16m-16 10h16" stroke="#494d43" strokeWidth="2.5" />
        </g>
        <path
          d="M186 221Q210 245 240 230M294 221Q270 245 240 230"
          fill="none"
          stroke="#6b492d"
          strokeWidth="2"
        />
        <rect
          x="236"
          y="226"
          width="8"
          height="8"
          fill="#bd8f55"
          stroke="#66472c"
          strokeWidth="2"
        />
        {[
          { x: 175, color: "#805136" },
          { x: 285, color: "#b6a68a" },
        ].map(({ x, color }) => (
          <g
            key={x}
            transform={`translate(${x} 210)`}
            stroke="#4c3829"
            strokeWidth="1.5"
          >
            <path d="M-6 24l-2 13h6l2-13M5 24l2 13h6l-2-13" fill={color} />
            <rect x="-11" y="-7" width="26" height="38" rx="7" fill={color} />
            <path d="M-6-7l2-17h15l4 17z" fill={color} />
            <path d="M-3-23v-7l5 6m6 0l5-6v9" fill={color} />
            <path d="M2 31v9" stroke="#382c25" strokeWidth="4" />
            <rect x="-9" y="5" width="22" height="13" rx="2" fill="#a4492d" />
            <path d="M-8 11h20M2 4v15" stroke="#e1b76c" />
            <path d="M-3-14h16" stroke="#caa16e" />
          </g>
        ))}
        <path d="M240 383v20" stroke="#6e502d" strokeWidth="3" />
        <rect
          x="228"
          y="381"
          width="24"
          height="12"
          rx="1"
          fill="#dfbb79"
          stroke="#6e502d"
        />
        <path d="M232 385h16m-16 4h16" stroke="#6e502d" />
      </svg>
      <ul className="inn-plan-key" aria-label="Stable floor plan key">
        <li>
          <i style={{ background: "#805136" }} />2 saddled horses
        </li>
        <li>
          <i style={{ background: "#bd8f55" }} />
          Leads & fence post
        </li>
        <li>
          <i style={{ background: "#d5b34f" }} />2 hay bales
        </li>
        <li>
          <i style={{ background: "#558baf" }} />
          Water-filled cauldron
        </li>
        <li>
          <i className="key-storage" />1 tack barrel
        </li>
        <li>
          <i className="key-sign" />
          Entrance sign
        </li>
      </ul>
    </figure>
  );
}
