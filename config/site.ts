export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Me-credit มีเครดิต.com",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "หน้าหลัก",
      href: "/",
    },
    {
      label: "จ่ายบิล",
      href: "/bill",
    },
    {
      label: "ร้านค้า",
      href: "/store",
    },
    {
      label: "ฝากเงิน",
      href: "/deposit",
    },
    {
      label: "ถอนเงิน",
      href: "/withdraw",
    },
    {
      label: "วิธีใช้",
      href: "/how-to",
    },
    {
      label: "ติดต่อเรา",
      href: "/contact-us",
    },
  ],
  navMenuItems: [
    {
      label: "โปรไฟล์",
      href: "/profile",
    },
    {
      label: "จ่ายบิล",
      href: "/bill",
    },
    {
      label: "ร้านค้า",
      href: "/store",
    },
    {
      label: "ฝากเงิน",
      href: "/deposit",
    },
    {
      label: "ถอนเงิน",
      href: "/withdraw",
    },
    {
      label: "ออกจากระบบ",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
