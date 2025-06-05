"use client";

import SettingsUnified from "@/components/settings/settings-unified";
import { UserType } from "@/utils/types/user";
import { motion } from "framer-motion";
import styles from "./settings-content.module.css";

interface SettingsContentProps {
  user: UserType;
}

export default function SettingsContent({ user }: SettingsContentProps) {
  return (
    <div className={styles.contentContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.motionWrapper}
      >
        <SettingsUnified user={user} />
      </motion.div>
    </div>
  );
}
