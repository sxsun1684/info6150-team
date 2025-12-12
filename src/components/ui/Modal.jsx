export default function Modal({ open, onClose, children }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            {/* Modal Container */}
            <div
                className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-xl max-h-[85vh] overflow-y-auto p-6 animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
}
