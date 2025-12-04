/**
 * Semantic Structure Benefits:
 *
 * - <section> provides a clear landmark region for screen readers
 *   and improves overall document structure for assistive technologies.
 *
 * - <article> identifies each content block (step) as an independent,
 *   meaningful unit, improving accessibility and search engine context.
 *
 * - Proper heading hierarchy (<h2> → <h3>) ensures logical reading order,
 *   enhances SEO, and maintains correct structure for screen readers.
 */

export default function HowItWorksCard({stepNumber, title, description}) {
    return (
        <article
            className="p-6 bg-blue-50 rounded-xl shadow"
            aria-label={title}
        >
            <h3 className="text-xl font-semibold mb-3">
                {stepNumber}. {title}
            </h3>

            <p className="text-sm leading-relaxed">
                {description}
            </p>
        </article>
    );
}
