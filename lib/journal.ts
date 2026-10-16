export type JournalBlock = {
  type: "heading" | "paragraph" | "quote" | "image";
  content: string;
  alt?: string;
  caption?: string;
};

export type JournalArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  author: "VELVET Editorial";
  cover: { src: string; alt: string };
  body: JournalBlock[];
};

const merinoParagraphs = [
  "A fabric begins long before it reaches a cutting table. In Tasmania, the landscape gives merino wool its first character: open air, changing weather, and patient tending. We follow that beginning with care, choosing cloth for its hand, resilience, and quiet warmth rather than for a passing trend. The result is material that feels considered from the first touch. This story is about attention at every stage, and about the people who understand that good cloth rewards a slower eye. The island's rugged terrain and temperate climate give the material a distinctive sense of place, while careful makers preserve its natural character.",
  "The first examination is tactile. A maker turns the cloth in their hands, studies its surface, and watches how it falls when lifted. Small observations guide later decisions about shape and seam placement. Merino has a gentle softness, but it also has structure; it can hold a clean line while remaining comfortable through a long day. That balance lets a simple garment do more with less, which is central to how we design at VELVET. Experienced hands can detect subtle variations in thickness and texture, informing whether the cloth is better suited for structured tailoring or fluid draping.",
  "At the mill, loose fibers become yarn through a sequence of measured movements. Cleaning removes what does not belong, carding aligns the fibers, and spinning gives them strength. Weaving brings the threads together with a rhythm that can be felt in the finished surface. None of these steps is theatrical. Their value is cumulative, built from calm repetition and the judgment of people who know when a material is ready for the next stage. Makers pay close attention to consistency before the yarn is woven into fabric, keeping the process guided by touch, observation, and experience.",
  "The Art of Merino is also a story about restraint. We do not ask fabric to imitate another material or force it into a shape it cannot support. Instead, our designers listen to its drape and let that quality lead. A jacket may keep a soft shoulder; a trouser may fall with an easy break. These decisions make clothing feel natural, while the cloth provides enough character to remain memorable. By honoring the material's inherent qualities, we reduce waste and avoid unnecessary chemical treatments that could compromise the wool's biodegradability.",
  "Care continues after weaving. We inspect the surface, check the hand, and consider how the fabric will behave in daily wear. A useful garment should invite repetition, not demand a special occasion. That means choosing constructions that can be pressed, brushed, and repaired without losing their sense of proportion. Thoughtful maintenance is part of the design, not an afterthought once a piece leaves the atelier. Simple practices like airing garments between wears and using mild detergents extend the life of the wool, allowing it to retain its softness and resilience over time.",
  "There is a particular pleasure in wearing material whose origin remains legible. Merino can feel light while offering comfort, and its texture changes gently with use. We value that quiet evolution. It gives a garment a personal history without making it precious or fragile. Our journey to Tasmania ends in a simple ambition: make pieces that carry the patience of their making into the everyday lives of the people who wear them. This connection to place and process fosters a deeper appreciation for clothing made to last, encouraging mindful consumption and stewardship. It also invites us to notice small choices: how a surface catches light, how a seam supports movement, and how care can preserve a favorite piece. In those details, material becomes part of everyday life."
];

const repairParagraphs = [
  "Clothing earns its place in a wardrobe through use. A sleeve gathers memories, a pocket softens, and a familiar collar becomes part of a daily ritual. Our 5-Year Repair Commitment begins with that idea: a VELVET piece should be supported after purchase, not treated as finished business. Repair keeps useful garments in rotation and gives people a practical way to care for what they already own. Each garment carries the stories of its wearer, and extending its life reduces the demand for new resources while honoring the craftsmanship that went into its creation. By choosing repair, we can keep useful garments in rotation and avoid the needless replacement of pieces that still have life in them. This mindful approach not only conserves resources but also deepens the personal connection between wearer and wardrobe.",
  "When a request arrives, our team starts by listening. We ask what happened, how the garment is worn, and what the wearer hopes to preserve. A loose seam may need a quiet reinforcement; a worn edge may call for a careful re-cut. The answer depends on the fabric, the construction, and the life of the piece. Good repair is not a generic patch. It is a conversation with the original design, examining wear patterns, fiber integrity, and stress points to determine the most appropriate intervention. We use natural light and magnification to assess the extent of wear, ensuring that our interventions are both precise and respectful of the garment's history. Our careful assessment ensures that each repair is both functional and sympathetic to the garment's original aesthetic.",
  "The atelier documents the condition before work begins. This makes the process clear and gives the maker a reference for proportion, color, and finish. Threads are matched as closely as practical, and pressure points are examined so the repair addresses a cause rather than hiding a symptom. We photograph each garment from multiple angles, note stitch counts, and measure any distortion to ensure the repair respects the original silhouette while restoring function. Detailed records allow us to replicate successful techniques across similar items. These records form a valuable archive that informs future design and repair practices.",
  "Repair also changes how we design new pieces. Feedback from worn garments reveals where movement is greatest, which closures are handled most often, and where small improvements can make care easier. Those observations return to our patterns and construction notes. In this way, an old garment teaches the next one. The relationship between design and repair becomes a patient loop rather than a single transaction, leading to reinforced stress points, thoughtful placement of fasteners, and selection of durable yet comfortable materials. By integrating wear insights, we create garments that are more resilient and easier to maintain over time.",
  "The commitment is deliberately quiet. We are not promising that fabric will never age or that every mark can disappear. We are promising attention within the stated five-year period for eligible manufacturing defects, with a clear review before work starts. Honest limits matter because trust depends on knowing what a service can do. When a repair is outside that commitment, we explain the options instead of hiding the distinction, providing transparent cost estimates and timelines for approval, and empowering customers to make informed decisions about their garments' futures. This openness builds trust and encourages customers to view repair as a positive, proactive choice. It keeps the conversation practical and human, giving each garment a chance to return to the wardrobe with its character intact. Care becomes a shared practice rather than a distant promise.",
  "A repaired garment can feel more valuable because its history is visible. It has been chosen, worn, cared for, and returned to use. That cycle asks less of new resources and more of our own patience. We hope the repair commitment encourages wardrobes built around familiarity rather than replacement. Longevity is not a slogan here; it is a series of small decisions made with a needle, a conversation, and enough time to do the work properly, turning visible mending into a badge of honor that celebrates the journey of each piece. Visible mending highlights the garment's journey, turning repairs into distinctive features that tell a story of care and longevity."
];

const artisanParagraphs = [
  "Every VELVET piece passes through many hands before it reaches a wardrobe. The names of those hands may not appear on a label, but their decisions remain in the line of a collar, the balance of a hem, and the ease of a sleeve. Our atelier works as a conversation between pattern makers, cutters, stitchers, and finishers. Each person brings a specific view of what makes clothing feel right, contributing to a collaborative process that values both tradition and innovation, ensuring that every detail is considered with care. This collaborative environment ensures that expertise is shared and standards are upheld across every stage of production.",
  "Pattern making gives an idea its first physical language. A paper line must account for movement, fabric behavior, and the relationship between one part and another. The work is precise, but it is not mechanical. A pattern maker studies the intended silhouette, then adjusts it through samples and fitting. Small changes can alter how a garment rests on the body, so patience is as important as accuracy. They often drape fabric on muslin to see how it falls, adjusting ease and grain lines to achieve the desired balance, and they create multiple iterations to refine the design before cutting begins. Through iterative draping and fitting, they refine the pattern to achieve both comfort and aesthetic integrity.",
  "Cutting turns that language into cloth. The cutter checks grain, placement, and the direction of a surface before a blade moves. Efficient cutting matters because material deserves respect, yet speed cannot replace concentration. Pieces must be marked clearly and kept together so the assembly team receives more than a stack of shapes; they receive a plan whose details are still readable. Attention to nap direction, matching plaids, and minimizing waste ensures that each cut honors the material's inherent qualities, and the cutter's expertise prevents costly errors that could compromise the garment's fit. The cutter's skill in aligning patterns with the fabric's grain and texture minimizes waste and enhances the garment's drape.",
  "Assembly brings a different kind of intelligence. Stitch length, seam allowance, pressing, and order of operations all affect how a garment wears. The team chooses techniques that suit the fabric and the stress a seam will meet. A quiet finish often takes more care than a visible one. When construction is sound, the wearer notices comfort first, not the effort hidden inside it. Reinforcement bars, bar tacks, and double stitching are applied where stress concentrates, while seam finishes prevent fraying and add durability, and thoughtful pressing enhances the garment's drape and longevity. These techniques strengthen high-stress areas while maintaining flexibility and comfort in the finished piece.",
  "Finishing is where the atelier checks its own work. Buttons are tested, hems are reviewed, and the garment is turned inside out so no detail escapes attention. The final review is not about chasing an impossible uniformity. It is about making sure the piece is coherent, durable, and ready for real life. If something feels unresolved, the garment returns to the person best placed to improve it. Topstitching, edge stitching, and pressing seams open contribute to a polished appearance that withstands daily wear, and meticulous attention to small details ensures lasting quality. Such meticulous finishing touches ensure that the garment not only looks excellent but also endures the rigors of daily wear.",
  "The artisans give VELVET its pace. Their craft resists the idea that quality can be rushed into existence at the last moment. Working together lets knowledge travel: an experienced hand can explain a fabric to a newer maker, while a fresh observation can challenge an old habit. We are proud of the finished garments, but the deeper achievement is this shared practice of making, checking, and learning, fostering an environment where mentorship and continuous improvement are woven into every stitch, and where every team member contributes to the collective excellence of the brand. This culture of continuous learning drives innovation while preserving the timeless values of craftsmanship and quality. It also creates room for careful questions, patient demonstrations, and the small discoveries that improve a familiar technique. The work remains grounded in attention, cooperation, and respect for the material."
];

function blocks(headings: string[], paragraphs: string[], image: { src: string; alt: string; caption: string }, quote: string): JournalBlock[] {
  const result: JournalBlock[] = [{ type: "paragraph", content: paragraphs[0] }];
  for (let i = 1; i < paragraphs.length; i += 1) {
    result.push({ type: "heading", content: headings[i - 1] }, { type: "paragraph", content: paragraphs[i] });
    if (i === 2) result.push({ type: "quote", content: quote });
    if (i === 3) result.push({ type: "image", content: image.src, alt: image.alt, caption: image.caption });
  }
  return result;
}

export const journalArticles: JournalArticle[] = [
  {
    slug: "the-art-of-merino-a-journey-to-tasmania",
    title: "The Art of Merino: A Journey to Tasmania",
    category: "Fabric",
    excerpt: "Exploring the heritage mills where our signature fabric originates and the craftspeople who preserve traditional weaving techniques.",
    date: "2026-10-01",
    author: "VELVET Editorial",
    cover: { src: "/images/lookbook-01.jpg", alt: "Soft folded fabric in a quiet studio" },
    body: blocks(["Reading the Cloth", "From Fiber to Yarn", "A Softer Silhouette", "Care as Design", "A Material with Memory"], merinoParagraphs, { src: "/images/lookbook-01.jpg", alt: "Fabric detail in natural light", caption: "A close study of texture and drape." }, "The best fabric does not ask to be admired; it asks to be lived in."),
  },
  {
    slug: "our-5-year-repair-commitment",
    title: "Our 5-Year Repair Commitment",
    category: "Sustainability",
    excerpt: "How we're building a more responsible fashion future by standing behind every piece we create for the lifetime of its wearer.",
    date: "2026-09-17",
    author: "VELVET Editorial",
    cover: { src: "/images/lookbook-03.jpg", alt: "Garment detail in an atelier" },
    body: blocks(["A Piece in Use", "Listening First", "The Work of Repair", "Lessons from Wear", "Clear Promises"], repairParagraphs, { src: "/images/lookbook-03.jpg", alt: "A garment being considered in the studio", caption: "Care starts with understanding how a piece is worn." }, "Keeping a garment is an act of attention, not a compromise."),
  },
  {
    slug: "meet-the-artisans",
    title: "Meet the Artisans",
    category: "Behind the Scenes",
    excerpt: "Stories from the 14 craftspeople and atelier teams who bring VELVET pieces to life with precision and dedication.",
    date: "2026-09-03",
    author: "VELVET Editorial",
    cover: { src: "/images/journal-03.jpg", alt: "Atelier worktable with fabric and tools" },
    body: blocks(["The First Line", "Cutting with Intention", "Joining the Pieces", "The Final Review", "Knowledge in Motion"], artisanParagraphs, { src: "/images/journal-03.jpg", alt: "Materials arranged on an atelier worktable", caption: "Tools and materials meet at the worktable." }, "Craft is shared knowledge made visible through careful work."),
  },
];

export function getAllArticles(): JournalArticle[] {
  return [...journalArticles].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug);
}

export function getOtherArticles(slug: string): JournalArticle[] {
  return getAllArticles().filter((article) => article.slug !== slug);
}

export function getReadTime(body: JournalBlock[]): string {
  const words = body.filter((block) => block.type === "paragraph").reduce((total, block) => total + block.content.trim().split(/\s+/).length, 0);
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));
}