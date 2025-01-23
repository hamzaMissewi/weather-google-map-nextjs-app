import { motion } from "framer-motion";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className="text-white/80 hover:text-white transition-colors duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
}
