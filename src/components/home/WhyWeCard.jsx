/**
 * WhyWeCard Component
 * - Displays a 64px icon alongside descriptive text.
 * - Used in the "Why Choose GoodTrip?" feature section.
 * - Semantic + accessible + reusable.
 */

export default function WhyWeCard({imgSrc, imgAlt, text}) {
    return (
        <li className="bg-white p-6 rounded-2xl shadow flex items-start gap-4">
            <img
                src={imgSrc}
                alt={imgAlt}
                className="w-16 h-16 object-contain flex-shrink-0"
            />
            <p className="leading-relaxed text-left text-gray-700">
                {text}
            </p>
        </li>
    );
}
