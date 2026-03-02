import { Download, ChevronLeft, X } from 'lucide-react';

// Map app names to their generated art paths
const artMap = {
    "The Brothers": "brothers_game_art_1772386065136.png",
    "Tech☠️": "tech_game_art_1772386084676.png",
    "My Application": "music_player_art_1772386099393.png",
    "Puja": "puja_shop_art_1772386114138.png",
    "FloodGuard AI": "floodguard_art_1772386129921.png",
    "Krishna Travels Tracker": "travels_app_art_1772386146860.png"
};

export default function ApkCard({ name, description, downloadUrl, icon: Icon, onClose, isModal }) {
    if (!isModal) {
        return (
            <div className="app-icon-card">
                <div className="icon-container-small">
                    <Icon size={30} />
                </div>
                <span className="app-name-small">{name}</span>
            </div>
        );
    }

    const artPath = artMap[name] || '';

    return (
        <div className="apk-card expanded static-card">
            <div className="close-action" onClick={onClose}>
                <X size={20} />
            </div>

            <div className="card-art-section">
                <img
                    src={`/${artPath}`}
                    alt={name}
                    className="card-art-image"
                />
                <div className="art-overlay"></div>
                <div className="icon-badge">
                    <Icon size={28} />
                </div>
            </div>

            <div className="card-info-section">
                <div className="card-header">
                    <h2 className="card-title">{name}</h2>
                    <span className="card-rarity">LEGENDARY</span>
                </div>

                <p className="card-description">{description}</p>

                <div className="card-stats-row">
                    <div className="stat-box">
                        <span className="label">Version</span>
                        <span className="value">v1.2.0</span>
                    </div>
                    <div className="stat-box">
                        <span className="label">Size</span>
                        <span className="value">48.2 MB</span>
                    </div>
                    <div className="stat-box">
                        <span className="label">Type</span>
                        <span className="value">Binary</span>
                    </div>
                </div>

                <div className="btn-group">
                    <a
                        href={downloadUrl}
                        download={name + ".apk"}
                        className="action-btn btn-primary"
                    >
                        <Download size={18} />
                        <span>INSTALL</span>
                    </a>
                    <button className="action-btn btn-outline" onClick={onClose}>
                        <ChevronLeft size={16} />
                        <span>BACK</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
