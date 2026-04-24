'use client'

import CardNav from './CardNav'

const items = [
  {
    label: "Platform",
    bgColor: "rgba(20, 20, 25, 0.85)",
    textColor: "#FFFFFF",
    links: [
      { label: "Core Features", ariaLabel: "Core Features" },
      { label: "AI Engine", ariaLabel: "AI Engine" }
    ]
  },
  {
    label: "Solutions", 
    bgColor: "rgba(20, 20, 25, 0.85)",
    textColor: "#FFFFFF",
    links: [
      { label: "Customer Portal", ariaLabel: "Customer Portal" },
      { label: "Employee Learning", ariaLabel: "Employee Learning" }
    ]
  },
  {
    label: "Resources",
    bgColor: "rgba(20, 20, 25, 0.85)", 
    textColor: "#FFFFFF",
    links: [
      { label: "Case Studies", ariaLabel: "Case Studies" },
      { label: "Pricing", ariaLabel: "Pricing" },
      { label: "Contact Us", ariaLabel: "Contact Us" }
    ]
  }
];

export default function Navbar() {
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <CardNav
        logo={<span className="logo-text">MapleLMS</span>}
        items={items}
        baseColor="rgba(200, 200, 215, 0.2)"
        menuColor="#1F2937"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power4.inOut" // smoother GSAP easing
      />
    </div>
  )
}
