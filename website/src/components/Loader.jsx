import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ isLoading }) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="loader-wrapper"
                >
                    <div className="loader-content">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="loader-text-container"
                        >
                            <h1 className="loader-title">KRISHNA</h1>
                            <div className="loader-line"></div>
                            <p className="loader-subtitle">INNOVATION & DESIGN</p>
                        </motion.div>

                        <motion.div
                            className="loader-spinner"
                            animate={{
                                rotate: 360,
                                borderRadius: ["25%", "50%", "25%"],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
